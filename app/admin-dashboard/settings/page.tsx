'use client';

import { useState } from 'react';
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');

        if (form.newPassword !== form.confirmPassword) {
            setStatus('error');
            setMessage('New passwords do not match.');
            return;
        }
        if (form.newPassword.length < 8) {
            setStatus('error');
            setMessage('New password must be at least 8 characters.');
            return;
        }

        setStatus('loading');

        try {
            const token = localStorage.getItem('wp_token') || '';
            const user = JSON.parse(localStorage.getItem('wp_user') || '{}');

            const res = await fetch('/api/admin/change-password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-wp-token': token },
                body: JSON.stringify({
                    username: user.username,
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage('Password updated successfully.');
                setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }

    return (
        <main className="flex-1 p-6 md:p-8 bg-[#f7f8fa] min-h-screen font-poppins">
            <div className="max-w-lg mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#2d2d2d]">Settings</h1>
                    <p className="text-sm text-gray-400 mt-1">Manage your account preferences.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#00baa3]/10 flex items-center justify-center">
                            <KeyRound className="h-5 w-5 text-[#00baa3]" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-[#2d2d2d]">Change Password</h2>
                            <p className="text-xs text-gray-400">Update your login credentials.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? 'text' : 'password'}
                                    value={form.currentPassword}
                                    onChange={set('currentPassword')}
                                    required
                                    className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00baa3] transition-colors"
                                    placeholder="Enter current password"
                                />
                                <button type="button" onClick={() => setShowCurrent((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* New password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={form.newPassword}
                                    onChange={set('newPassword')}
                                    required
                                    minLength={8}
                                    className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00baa3] transition-colors"
                                    placeholder="Min. 8 characters"
                                />
                                <button type="button" onClick={() => setShowNew((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                value={form.confirmPassword}
                                onChange={set('confirmPassword')}
                                required
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00baa3] transition-colors"
                                placeholder="Repeat new password"
                            />
                        </div>

                        {/* Feedback */}
                        {message && (
                            <div className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl ${status === 'success'
                                    ? 'bg-[#00baa3]/10 text-[#00baa3]'
                                    : 'bg-red-50 text-red-500'
                                }`}>
                                {status === 'success'
                                    ? <CheckCircle2 size={15} />
                                    : <AlertCircle size={15} />}
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-2.5 bg-[#00baa3] text-white text-sm font-semibold rounded-xl hover:bg-[#009e8c] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Updating…' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
