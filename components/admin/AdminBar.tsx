"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Pencil, X, LogOut } from "lucide-react";

export default function AdminBar() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("wp_token");
        setVisible(!!token && !dismissed);
    }, [dismissed]);

    useEffect(() => {
        // Push page content down by the bar height
        document.body.style.paddingTop = visible ? "36px" : "";
        return () => { document.body.style.paddingTop = ""; };
    }, [visible]);

    // Don't show on admin pages
    if (!visible || pathname.startsWith("/admin")) return null;

    const handleLogout = () => {
        localStorage.removeItem("wp_token");
        setVisible(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-dark-grey text-white text-xs font-poppins">
            <div className="max-w-[1200px] mx-auto px-4 h-9 flex items-center justify-between gap-4">
                {/* Left: label */}
                <div className="flex items-center gap-2 text-white/60">
                    <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse inline-block" />
                    <span>Admin mode</span>
                </div>

                {/* Center: quick links */}
                <div className="flex items-center gap-1">
                    <Link
                        href="/admin-dashboard"
                        className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                    >
                        <LayoutDashboard size={13} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin-dashboard/pages/homepage"
                        className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                    >
                        <Pencil size={13} />
                        Edit Homepage
                    </Link>
                    <Link
                        href="/admin-dashboard/posts/new"
                        className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                    >
                        New Post
                    </Link>
                </div>

                {/* Right: logout + dismiss */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    >
                        <LogOut size={13} />
                        Logout
                    </button>
                    <button
                        onClick={() => setDismissed(true)}
                        className="p-1 rounded hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                        aria-label="Dismiss admin bar"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
