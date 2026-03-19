"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp, ExternalLink, Globe } from "lucide-react";
import config from "@/config/framework.config";
import { statCards as statCardConfig, quickActions as quickActionConfig } from "@/config/admin-nav";

export default function Dashboard() {
    const [stats, setStats] = useState({ posts: 0, team: 0, accounts: 0, media: 0 });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ name?: string } | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("wp_user");
        if (stored) try { setUser(JSON.parse(stored)); } catch { /* */ }

        const token = localStorage.getItem("wp_token") || "";
        const headers = { "x-wp-token": token };
        Promise.all([
            fetch("/api/posts", { headers }).then(r => r.json()),
            fetch("/api/team", { headers }).then(r => r.json()),
            fetch("/api/accounts", { headers }).then(r => r.json()),
            fetch("/api/media", { headers }).then(r => r.json()),
        ]).then(([posts, team, accounts, media]) => {
            setStats({
                posts: posts.total ?? posts.posts?.length ?? 0,
                team: team.total ?? team.members?.length ?? 0,
                accounts: accounts.accounts?.length ?? 0,
                media: media.total ?? media.items?.length ?? 0,
            });
        }).finally(() => setLoading(false));
    }, []);

    const statCards = statCardConfig.map((c) => ({ ...c, value: stats[c.statKey], accent: c.accentHex }));
    const quickActions = quickActionConfig.map((c) => ({ ...c, accent: c.accentHex }));

    return (
        <main className="flex-1 p-6 md:p-8 bg-[#f7f8fa] min-h-screen font-poppins">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold tracking-[3px] uppercase text-[#00baa3]">{config.org.name}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#2d2d2d]">
                            Welcome back{user?.name ? `, ${user.name}` : ''} 👋
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm">Here's what's happening with your site today.</p>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#2d2d2d] hover:border-[#00baa3] hover:text-[#00baa3] transition-all shadow-sm self-start"
                    >
                        <Globe size={15} />
                        Visit Website
                        <ExternalLink size={13} className="opacity-50" />
                    </a>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {statCards.map(({ label, value, icon: Icon, accent, bg, href }) => (
                        <Link key={label} href={href}
                            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group border border-transparent hover:border-[#00baa3]/20"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}>
                                    <Icon className="h-5 w-5" style={{ color: accent }} />
                                </div>
                                <TrendingUp className="h-4 w-4 text-gray-200 group-hover:text-[#00baa3] transition-colors" />
                            </div>
                            <p className="text-2xl font-bold text-[#2d2d2d]">
                                {loading
                                    ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" />
                                    : value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 font-medium">{label}</p>
                            <div className="mt-3 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full" style={{ backgroundColor: accent }} />
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-[#2d2d2d]">Quick Actions</h2>
                        <span className="text-xs text-gray-400 font-medium">Shortcuts to common tasks</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {quickActions.map(({ href, icon: Icon, label, sub, accent }) => (
                            <Link key={href} href={href}
                                className="group p-4 border border-gray-100 rounded-xl hover:border-[#00baa3]/40 hover:bg-[#00baa3]/5 transition-all"
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                    style={{ backgroundColor: `${accent}18` }}>
                                    <Icon className="h-5 w-5 transition-colors" style={{ color: accent }} />
                                </div>
                                <p className="text-sm font-semibold text-[#2d2d2d] group-hover:text-[#00baa3] transition-colors">{label}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-300 mt-8">
                    {config.org.name} Admin · {new Date().getFullYear()}
                </p>
            </div>
        </main>
    );
}
