"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users, FileText, PenSquare, CreditCard, Image, TrendingUp } from "lucide-react";

export default function Dashboard() {
    const [stats, setStats] = useState({ posts: 0, team: 0, accounts: 0, media: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    const statCards = [
        { label: "Published Posts", value: stats.posts, icon: FileText, color: "bg-primary-green/10", iconColor: "text-primary-green", href: "/admin-dashboard/posts" },
        { label: "Team Members", value: stats.team, icon: Users, color: "bg-primary-yellow/20", iconColor: "text-primary-yellow", href: "/admin-dashboard/team" },
        { label: "Bank Accounts", value: stats.accounts, icon: CreditCard, color: "bg-blue-50", iconColor: "text-blue-500", href: "/admin-dashboard/accounts" },
        { label: "Media Files", value: stats.media, icon: Image, color: "bg-purple-50", iconColor: "text-purple-500", href: "/admin-dashboard/media" },
    ];

    return (
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-dark-grey">Dashboard</h1>
                    <p className="text-gray-400 mt-1 text-sm">Forward Falls Initiative — Content Management</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {statCards.map(({ label, value, icon: Icon, color, iconColor, href }) => (
                        <Link key={label} href={href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 ${iconColor}`} />
                                </div>
                                <TrendingUp className="h-4 w-4 text-gray-200 group-hover:text-primary-green transition-colors" />
                            </div>
                            <p className="text-2xl font-bold text-dark-grey">
                                {loading ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" /> : value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 font-medium">{label}</p>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-base font-semibold text-dark-grey mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link href="/admin-dashboard/posts/new"
                            className="p-4 border border-gray-100 rounded-xl hover:border-primary-green hover:bg-primary-green/5 transition-all text-center group">
                            <PenSquare className="h-7 w-7 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Write a Post</span>
                            <p className="text-xs text-gray-400 mt-0.5">Create new content</p>
                        </Link>
                        <Link href="/admin-dashboard/posts"
                            className="p-4 border border-gray-100 rounded-xl hover:border-primary-green hover:bg-primary-green/5 transition-all text-center group">
                            <FileText className="h-7 w-7 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Manage Posts</span>
                            <p className="text-xs text-gray-400 mt-0.5">Edit or delete posts</p>
                        </Link>
                        <Link href="/admin-dashboard/team"
                            className="p-4 border border-gray-100 rounded-xl hover:border-primary-green hover:bg-primary-green/5 transition-all text-center group">
                            <Users className="h-7 w-7 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Team Members</span>
                            <p className="text-xs text-gray-400 mt-0.5">Update the team</p>
                        </Link>
                        <Link href="/admin-dashboard/accounts"
                            className="p-4 border border-gray-100 rounded-xl hover:border-primary-green hover:bg-primary-green/5 transition-all text-center group">
                            <CreditCard className="h-7 w-7 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Bank Accounts</span>
                            <p className="text-xs text-gray-400 mt-0.5">Manage donation details</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
