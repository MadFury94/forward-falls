"use client";

import { useState, useEffect } from "react";
import { Lock, Save, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, User, Shield } from "lucide-react";

interface WPUser {
    name?: string;
    email?: string;
    username?: string;
}

export default function AccountPage() {
    const [user, setUser] = useState<WPUser | null>(null);
    const [token, setToken] = useState("");

    // Password change form
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("wp_user");
        const storedToken = localStorage.getItem("wp_token") || "";
        setToken(storedToken);
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { /* */ }
        }
    }, []);

    const passwordStrength = (pwd: string): { label: string; color: string; width: string } => {
        if (!pwd) return { label: "", color: "bg-gray-200", width: "w-0" };
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
        const score = [pwd.length >= 8, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
        if (score <= 2) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
        if (score === 3) return { label: "Fair", color: "bg-yellow-400", width: "w-2/4" };
        if (score === 4) return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
        return { label: "Strong", color: "bg-green-500", width: "w-full" };
    };

    const strength = passwordStrength(newPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters");
            return;
        }
        if (newPassword === currentPassword) {
            setError("New password must be different from your current password");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-wp-token": token,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();
            if (data.success) {
                setSuccess("Password changed successfully. Use your new password next time you log in.");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setError(data.error || "Failed to change password");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const initials = user?.name
        ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
        : "AD";

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#f7f8fa] min-h-screen">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <span className="text-xs font-bold tracking-[3px] uppercase text-[#00baa3]">Settings</span>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] mt-1">My Account</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your account details and security settings.</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#00baa3]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-bold text-[#00baa3]">{initials}</span>
                        </div>
                        <div>
                            <p className="font-bold text-[#2d2d2d] text-lg">{user?.name || "Admin"}</p>
                            <p className="text-sm text-gray-400">{user?.email || ""}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Shield className="h-3.5 w-3.5 text-[#00baa3]" />
                                <span className="text-xs text-[#00baa3] font-semibold">Administrator</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-lg bg-[#00baa3]/10 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-[#00baa3]" />
                        </div>
                        <div>
                            <h2 className="font-bold text-[#2d2d2d]">Change Password</h2>
                            <p className="text-xs text-gray-400">Update your WordPress account password</p>
                        </div>
                    </div>

                    {success && (
                        <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-700 text-sm">
                            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2d2d2d] mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00baa3] focus:border-transparent text-sm"
                                    placeholder="Enter your current password"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showCurrent
                                        ? <EyeOff className="h-4 w-4 text-gray-400" />
                                        : <Eye className="h-4 w-4 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2d2d2d] mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00baa3] focus:border-transparent text-sm"
                                    placeholder="Enter a new password"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showNew
                                        ? <EyeOff className="h-4 w-4 text-gray-400" />
                                        : <Eye className="h-4 w-4 text-gray-400" />}
                                </button>
                            </div>
                            {/* Strength indicator */}
                            {newPassword && (
                                <div className="mt-2">
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Password strength: <span className="font-semibold text-[#2d2d2d]">{strength.label}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2d2d2d] mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pl-4 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00baa3] focus:border-transparent text-sm transition-colors ${confirmPassword && newPassword !== confirmPassword
                                            ? "border-red-300 bg-red-50"
                                            : confirmPassword && newPassword === confirmPassword
                                                ? "border-green-300 bg-green-50"
                                                : "border-gray-200"
                                        }`}
                                    placeholder="Re-enter your new password"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirm
                                        ? <EyeOff className="h-4 w-4 text-gray-400" />
                                        : <Eye className="h-4 w-4 text-gray-400" />}
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 bg-[#00baa3] text-white font-semibold rounded-xl hover:bg-[#00baa3]/90 transition-all disabled:opacity-50 shadow-sm text-sm"
                            >
                                {saving
                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                    : <Save className="h-4 w-4" />}
                                {saving ? "Saving..." : "Update Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
