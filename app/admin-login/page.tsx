"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Lock, Mail, Eye, EyeOff, Shield, BarChart3,
    Users, FileText, Settings, LogIn, AlertCircle,
    X, CheckCircle, ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);
    const [forgotError, setForgotError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch("/api/wordpress-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                localStorage.setItem("wp_token", data.token);
                localStorage.setItem("wp_user", JSON.stringify(data.user));
                router.push("/admin-dashboard");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotError("");
        setForgotLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });
            const data = await res.json();
            if (data.success) {
                setForgotSuccess(true);
            } else {
                setForgotError(data.error || "Something went wrong");
            }
        } catch {
            setForgotError("Connection error. Please try again.");
        } finally {
            setForgotLoading(false);
        }
    };

    const closeForgot = () => {
        setShowForgot(false);
        setForgotEmail("");
        setForgotError("");
        setForgotSuccess(false);
    };

    return (
        <div className="flex min-h-screen">

            {/* ── Left branding panel ── */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary-green relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                    />
                </div>
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full" />
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-40 left-20 w-48 h-48 bg-white/10 rounded-full" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary-yellow/30 rounded-full" />

                <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-16 text-white">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
                        <Image src="/FFI.png" alt="Forward Falls Initiative Logo" width={120} height={120} className="filter brightness-0 invert" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-sm font-medium tracking-wide">ADMIN PORTAL</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-4xl font-bold text-center mb-6">
                        Welcome Back
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-lg text-center text-white/80 mb-12 max-w-md">
                        Access the admin dashboard to manage programs, users, and content
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="grid grid-cols-2 gap-4 w-full max-w-md">
                        {[
                            { icon: BarChart3, label: "Analytics", sub: "Track metrics" },
                            { icon: Users, label: "User Mgmt", sub: "Manage accounts" },
                            { icon: FileText, label: "Programs", sub: "Edit content" },
                            { icon: Settings, label: "Settings", sub: "Configure system" },
                        ].map(({ icon: Icon, label, sub }) => (
                            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                                <Icon className="h-8 w-8 text-primary-yellow mb-2" />
                                <h3 className="font-semibold">{label}</h3>
                                <p className="text-sm text-white/70">{sub}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── Right login panel ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-light-bg">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Image src="/FFI.png" alt="Forward Falls Initiative Logo" width={80} height={80} className="mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-dark-grey">Admin Portal</h1>
                    </div>

                    {/* Login card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-xl p-8">

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-dark-grey">Admin Login</h2>
                            <p className="mt-2 text-gray-500">Enter your credentials to access the dashboard</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-600">
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                                        placeholder="username or email@example.com"
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <button type="button" onClick={() => setShowForgot(true)} className="text-sm text-primary-green hover:underline font-medium">
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                        {showPassword
                                            ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green" />
                                    <span className="ml-3 text-sm text-gray-600">Remember me for 30 days</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-6 bg-primary-green hover:bg-primary-green/90 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center transition-all hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5 mr-2" />
                                        Sign In to Dashboard
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="flex items-center my-8">
                            <div className="flex-1 border-t border-gray-200" />
                            <span className="px-4 text-sm text-gray-400">Secure Access</span>
                            <div className="flex-1 border-t border-gray-200" />
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <Shield className="h-5 w-5 text-green-500" />
                            <span>256-bit SSL Encrypted Connection</span>
                        </div>
                    </motion.div>

                    <div className="mt-8 text-center space-y-2">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary-green hover:underline font-medium">
                            ← Back to Website
                        </Link>
                        <p className="text-xs text-gray-400">&copy; 2026 Forward Falls Initiative. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* ── Forgot password modal ── */}
            <AnimatePresence>
                {showForgot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) closeForgot(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
                        >
                            <button onClick={closeForgot} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="h-5 w-5" />
                            </button>

                            {forgotSuccess ? (
                                <div className="text-center py-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h2 className="text-xl font-bold text-dark-grey mb-2">Check your email</h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        If <span className="font-semibold text-dark-grey">{forgotEmail}</span> is registered,
                                        a reset link has been sent. Check your inbox and spam folder.
                                    </p>
                                    <button onClick={closeForgot} className="w-full py-3 bg-primary-green text-white font-semibold rounded-xl hover:bg-primary-green/90 transition-all">
                                        Back to Login
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mb-4">
                                            <Lock className="h-6 w-6 text-primary-green" />
                                        </div>
                                        <h2 className="text-xl font-bold text-dark-grey">Reset Password</h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Enter the email address associated with your WordPress account and we'll send a reset link.
                                        </p>
                                    </div>

                                    {forgotError && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                            {forgotError}
                                        </div>
                                    )}

                                    <form onSubmit={handleForgotPassword}>
                                        <div className="mb-5">
                                            <label className="block text-sm font-semibold text-dark-grey mb-2">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={forgotEmail}
                                                    onChange={(e) => setForgotEmail(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-sm"
                                                    placeholder="admin@forwardfalls.com"
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={forgotLoading}
                                            className="w-full py-3 bg-primary-green text-white font-semibold rounded-xl hover:bg-primary-green/90 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
                                        >
                                            {forgotLoading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : "Send Reset Link"}
                                        </button>

                                        <button type="button" onClick={closeForgot} className="w-full mt-3 py-3 text-sm text-gray-500 hover:text-dark-grey flex items-center justify-center gap-1">
                                            <ArrowLeft className="h-4 w-4" /> Back to Login
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
