"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PenSquare, BarChart3, Settings, LogOut } from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "All Posts", href: "/admin-dashboard/posts", icon: FileText },
    { label: "New Post", href: "/admin-dashboard/posts/new", icon: PenSquare },
    { label: "Analytics", href: "#", icon: BarChart3 },
    { label: "Settings", href: "#", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-dark-grey text-white flex-shrink-0 flex flex-col min-h-screen">
            <div className="p-6 border-b border-white/10">
                <Link href="/admin-dashboard" className="flex items-center gap-3">
                    <img src="/FFI.png" alt="FFI" className="w-10 h-10 filter brightness-0 invert" />
                    <div>
                        <span className="font-bold text-base block">FFI Admin</span>
                        <span className="text-xs text-gray-400">Content Manager</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 py-4">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${active
                                    ? "bg-primary-green/20 border-l-4 border-primary-green text-primary-green"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link
                    href="/admin-login"
                    className="flex items-center gap-3 px-2 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Link>
            </div>
        </aside>
    );
}
