"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Save, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function NewTeamMember() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [form, setForm] = useState({ name: "", roles: "", order: 0 });

    useEffect(() => {
        setToken(localStorage.getItem("wp_token") || "");
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImage = async (): Promise<number | null> => {
        if (!imageFile) return null;
        const fd = new FormData();
        fd.append("file", imageFile);
        const res = await fetch("/api/posts/upload", {
            method: "POST",
            headers: { "x-wp-token": token },
            body: fd,
        });
        const data = await res.json();
        if (data.success) return data.id;
        setError(`Image upload failed: ${data.error}`);
        return null;
    };

    const submit = async () => {
        if (!form.name) { setError("Name is required"); return; }
        setError("");
        setLoading(true);
        try {
            let imageId: number | null = null;
            if (imageFile) {
                imageId = await uploadImage();
                if (!imageId) { setLoading(false); return; }
            }
            const res = await fetch("/api/team", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-wp-token": token },
                body: JSON.stringify({
                    name: form.name,
                    roles: form.roles,
                    menu_order: form.order,
                    ...(imageId ? { featured_media: imageId } : {}),
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess("Member created!");
                setTimeout(() => router.push("/admin-dashboard/team"), 1200);
            } else {
                setError(data.error || "Failed to create");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-lg mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin-dashboard/team" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-dark-grey" />
                    </Link>
                    <h1 className="text-3xl font-bold text-dark-grey">New Team Member</h1>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" /> {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
                    </div>
                )}

                <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-dark-grey mb-2">Photo</label>
                        {imagePreview ? (
                            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 mx-auto">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover object-top" />
                                <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); }}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50">
                                    <X className="h-4 w-4 text-red-500" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-green hover:bg-primary-green/5 transition-colors mx-auto">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500 text-center">Upload photo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-dark-grey mb-2">Full Name *</label>
                        <input type="text" value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                            placeholder="e.g. Jane Doe" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-dark-grey mb-2">Role / Title</label>
                        <input type="text" value={form.roles}
                            onChange={(e) => setForm({ ...form, roles: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                            placeholder="e.g. Program Director" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-dark-grey mb-2">Display Order</label>
                        <input type="number" value={form.order} min={0}
                            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green" />
                        <p className="text-xs text-gray-400 mt-1">Lower number appears first</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <Link href="/admin-dashboard/team" className="text-sm text-gray-500 hover:text-dark-grey">Cancel</Link>
                        <button onClick={submit} disabled={loading || !form.name}
                            className="flex items-center gap-2 px-6 py-3 bg-primary-green text-white font-semibold rounded-xl hover:bg-primary-green/90 transition-all disabled:opacity-50">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Add Member
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
