'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Users,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navItems = [
    { href: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin-dashboard/posts/new', label: 'New Post', icon: FileText },
    { href: '#', label: 'Users', icon: Users },
    { href: '#', label: 'Analytics', icon: BarChart3 },
    { href: '#', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
            {/* Logo */}
            <div className="flex h-14 items-center gap-2 border-b border-border px-4">
                <img src="/FFI.png" alt="FFI" className="h-7 w-7 dark:invert" />
                <span className="font-semibold text-sm">FFI Admin</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            <Separator />

            {/* Footer */}
            <div className="p-3">
                <Link
                    href="/admin-login"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Logout
                </Link>
            </div>
        </aside>
    )
}
