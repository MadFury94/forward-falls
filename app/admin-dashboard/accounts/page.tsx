"use client";

export const runtime = 'edge';

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Edit2, Save, X, Loader2, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

interface Account {
    id: number;
    acf: { bank_name?: string; account_number?: string; account_name?: string };
    title: { rendered: string };
}

const EMPTY = { bank_name: "", account_number: "", account_name: "" };

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState(EMPTY);

    const token = () => typeof window !== "undefined" ? localStorage.getItem("wp_token") || "" : "";

    const fetchAccounts = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/accounts", { headers: { "x-wp-token": token() } });
            const data = await res.json();
            if (data.success) setAccounts(data.accounts);
            else setError(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
        } catch (e: any) {
            setError(e?.message || "Network error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

    const openNew = () => { setForm(EMPTY); setEditId(null); setShowForm(true); setError(""); setSuccess(""); };
    const openEdit = (a: Account) => {
        setForm({ bank_name: a.acf?.bank_name || "", account_number: a.acf?.account_number || "", account_name: a.acf?.account_name || "" });
        setEditId(a.id); setShowForm(true); setError(""); setSuccess("");
    };
    const closeForm = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };

    const submit = async () => {
        if (!form.bank_name || !form.account_number || !form.account_name) {
            setError("All fields are required"); return;
        }
        setSaving(true); setError(""); setSuccess("");
        try {
            const url = editId ? `/api/accounts/${editId}` : "/api/accounts";
            const method = editId ? "PATCH" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "x-wp-token": token() },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(editId ? "Account updated!" : "Account added!");
                closeForm();
                fetchAccounts();
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(data.error || "Failed to save");
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Delete "${name}"?`)) return;
        setDeleting(id);
        try {
            await fetch(`/api/accounts/${id}`, { method: "DELETE", headers: { "x-wp-token": token() } });
            fetchAccounts();
        } finally {
            setDeleting(null);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-grey">Account Numbers</h1>
                        <p className="text-gray-500 text-sm mt-1">{accounts.length} account{accounts.length !== 1 ? "s" : ""}</p>
                    </div>
                    <button onClick={openNew}
                        className="flex items-center gap-2 bg-primary-green text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-green/90 transition-all shadow-sm">
                        <Plus className="h-4 w-4" /> Add Account
                    </button>
                </div>

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm">
                        <CheckCircle className="h-4 w-4" /> {success}
                    </div>
                )}

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-primary-green/20">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-dark-grey">{editId ? "Edit Account" : "New Account"}</h2>
                            <button onClick={closeForm}><X className="h-5 w-5 text-gray-400 hover:text-dark-grey" /></button>
                        </div>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" /> {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1">Bank Name *</label>
                                <input type="text" value={form.bank_name} onChange={e => setForm({ ...form, bank_name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="e.g. First Bank" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1">Account Number *</label>
                                <input type="text" value={form.account_number} onChange={e => setForm({ ...form, account_number: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="e.g. 0123456789" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1">Account Name *</label>
                                <input type="text" value={form.account_name} onChange={e => setForm({ ...form, account_name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                                    placeholder="e.g. Forward Falls Initiative" />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={closeForm} className="px-4 py-2 text-sm text-gray-500 hover:text-dark-grey">Cancel</button>
                                <button onClick={submit} disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-green text-white font-semibold rounded-xl hover:bg-primary-green/90 disabled:opacity-50 text-sm">
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    {editId ? "Update" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Accounts List */}
                {loading ? (
                    <div className="p-12 text-center bg-white rounded-xl shadow-sm">
                        <div className="animate-spin h-8 w-8 border-2 border-primary-green border-t-transparent rounded-full mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">Loading accounts...</p>
                    </div>
                ) : accounts.length === 0 && !showForm ? (
                    <div className="p-12 text-center bg-white rounded-xl shadow-sm">
                        <CreditCard className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No accounts yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {accounts.map(a => (
                            <div key={a.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="h-5 w-5 text-primary-green" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-dark-grey">{a.acf?.bank_name || a.title?.rendered}</p>
                                        <p className="text-sm text-gray-500">{a.acf?.account_number}</p>
                                        <p className="text-xs text-primary-green font-medium">{a.acf?.account_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button onClick={() => openEdit(a)}
                                        className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:border-primary-green hover:text-primary-green transition-colors">
                                        <Edit2 className="h-3 w-3" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(a.id, a.acf?.bank_name || "")}
                                        disabled={deleting === a.id}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
