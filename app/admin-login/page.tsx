"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    Shield,
    BarChart3,
    Users,
    FileText,
    Settings,
    LogIn,
    AlertCircle
} from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validate against WordPress JWT API
            const response = await fetch("/api/wordpress-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("wp_token", data.token);
                localStorage.setItem("wp_user", JSON.stringify(data.user));
                document.cookie = `wp_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
                router.push("/admin-dashboard");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Branding & Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary-green relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full" />
                <div className="absolute bottom-40 left-20 w-48 h-48 bg-white/10 rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary-yellow/30 rounded-full animate-pulse" style={{ animationDuration: '7s' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-16 text-white">
                    <Animate
                        animation="fadeInDown"
                        delay={0}
                        duration={0.6}
                        className="mb-8"
                    >
                        <Image
                            src="/FFI.png"
                            alt="Forward Falls Initiative Logo"
                            width={120}
                            height={120}
                            className="filter brightness-0 invert"
                        />
                    </Animate>

                    <Animate
                        animation="scaleIn"
                        delay={0.2}
                        duration={0.5}
                        className="mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                        <span className="text-sm font-medium tracking-wide">ADMIN PORTAL</span>
                    </Animate>

                    <Animate
                        animation="fadeInUp"
                        delay={0.3}
                        duration={0.5}
                        className="text-4xl font-bold text-center mb-6"
                    >
                        Welcome Back
                    </Animate>

                    <Animate
                        animation="fadeIn"
                        delay={0.4}
                        duration={0.5}
                        className="text-lg text-center text-white/80 mb-12 max-w-md"
                    >
                        Access the admin dashboard to manage programs, users, and content
                    </Animate>

                    {/* Feature Cards */}
                    <Animate
                        animation="fadeInUp"
                        delay={0.5}
                        duration={0.5}
                        className="grid grid-cols-2 gap-4 w-full max-w-md"
                    >
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                            <BarChart3 className="h-8 w-8 text-primary-yellow mb-2" />
                            <h3 className="font-semibold">Analytics</h3>
                            <p className="text-sm text-white/70">Track metrics</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                            <Users className="h-8 w-8 text-primary-yellow mb-2" />
                            <h3 className="font-semibold">User Mgmt</h3>
                            <p className="text-sm text-white/70">Manage accounts</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                            <FileText className="h-8 w-8 text-primary-yellow mb-2" />
                            <h3 className="font-semibold">Programs</h3>
                            <p className="text-sm text-white/70">Edit content</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                            <Settings className="h-8 w-8 text-primary-yellow mb-2" />
                            <h3 className="font-semibold">Settings</h3>
                            <p className="text-sm text-white/70">Configure system</p>
                        </div>
                    </Animate>
                </div>
            </div>

            {/* Right Side - Login Form */ }
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-light-bg">
        <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
                <Image
                    src="/FFI.png"
                    alt="Forward Falls Initiative Logo"
                    width={80}
                    height={80}
                    className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-dark-grey">Admin Portal</h1>
            </div>

            {/* Login Card */}
            <Animate
                animation="fadeInUp"
                delay={0}
                duration={0.5}
                className="bg-white rounded-2xl shadow-xl p-8"
            >
                {/* Card Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-dark-grey">Admin Login</h2>
                    <p className="mt-2 text-gray-500">Enter your credentials to access the dashboard</p>
                </div>

                {/* Error Message */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-6">
                        <Label htmlFor="email" className="mb-2">
                            Username or Email
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                                placeholder="username or email@example.com"
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm text-primary-green hover:underline font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <Checkbox id="remember" />
                            <span className="ml-3 text-sm text-gray-600">Remember me for 30 days</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-6 bg-primary-green hover:bg-primary-green/90 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            <>
                                <LogIn className="h-5 w-5 mr-2" />
                                Sign In to Dashboard
                            </>
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-4 text-sm text-gray-400">Secure Access</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>256-bit SSL Encrypted Connection</span>
                </div>
            </Animate>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary-green hover:underline font-medium">
                ← Back to Website
            </Link>
            <p className="text-xs text-gray-400">
                &copy; 2026 Forward Falls Initiative. All rights reserved.
            </p>
        </div>
    </div>
        </div >
        </div >
    );
}
