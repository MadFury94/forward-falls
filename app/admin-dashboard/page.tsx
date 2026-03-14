import Link from "next/link";
import { Users, FileText, Settings, BarChart3, TrendingUp, Eye, PenSquare } from "lucide-react";

export default function Dashboard() {
    return (
        <main className="flex-1 p-8 overflow-y-auto bg-light-bg min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-dark-grey">Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome to Forward Falls Initiative Admin Panel</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Users</p>
                                <p className="text-3xl font-bold text-dark-grey mt-1">1,234</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-primary-green" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-green-500 text-sm">
                            <TrendingUp className="h-4 w-4" />
                            <span>+12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Page Views</p>
                                <p className="text-3xl font-bold text-dark-grey mt-1">45.2K</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-yellow/20 rounded-full flex items-center justify-center">
                                <Eye className="h-6 w-6 text-primary-yellow" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-green-500 text-sm">
                            <TrendingUp className="h-4 w-4" />
                            <span>+8% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Active Programs</p>
                                <p className="text-3xl font-bold text-dark-grey mt-1">12</p>
                            </div>
                            <div className="w-12 h-12 bg-secondary-orange/20 rounded-full flex items-center justify-center">
                                <FileText className="h-6 w-6 text-secondary-orange" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-dark-grey mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/admin-dashboard/posts/new" className="p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-primary-green/5 transition-all text-center">
                            <PenSquare className="h-8 w-8 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">New Post</span>
                        </Link>
                        <Link href="/admin-dashboard/posts" className="p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-primary-green/5 transition-all text-center">
                            <FileText className="h-8 w-8 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">All Posts</span>
                        </Link>
                        <Link href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-primary-green/5 transition-all text-center">
                            <BarChart3 className="h-8 w-8 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Analytics</span>
                        </Link>
                        <Link href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-primary-green/5 transition-all text-center">
                            <Settings className="h-8 w-8 text-primary-green mx-auto mb-2" />
                            <span className="text-sm font-medium text-dark-grey">Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
