// ─────────────────────────────────────────────────────────────
// admin-dashboard.ts
// Dashboard-specific configuration for the admin panel.
// Edit here to customize dashboard layout, cards, and features.
// ─────────────────────────────────────────────────────────────

import type { LucideIcon } from 'lucide-react'
import { FileText, Users, CreditCard, Image, PenSquare, LayoutDashboard, Globe } from 'lucide-react'

export interface DashboardStatCard {
    label: string
    icon: LucideIcon
    /** Key in the stats object returned by the dashboard fetch */
    statKey: 'posts' | 'team' | 'accounts' | 'media'
    href: string
    /** Tailwind background color class */
    bg: string
    /** Hex color for the icon */
    accentHex: string
}

export interface DashboardQuickAction {
    href: string
    icon: LucideIcon
    label: string
    sub: string
    /** Hex color */
    accentHex: string
}

export interface DashboardConfig {
    /** Organization name displayed in dashboard header */
    orgName: string
    /** Admin panel label */
    adminLabel: string
    /** Logo URL for admin sidebar */
    logo: string
    /** Welcome message template (use {name} placeholder) */
    welcomeMessage: string
    /** Stat cards configuration */
    statCards: DashboardStatCard[]
    /** Quick actions configuration */
    quickActions: DashboardQuickAction[]
    /** Features enabled in the admin dashboard */
    features: {
        passwordChange: boolean
        mediaLibrary: boolean
        teamManagement: boolean
        postManagement: boolean
        pageEditing: boolean
        accountManagement: boolean
    }
}

const config: DashboardConfig = {
    orgName: 'Forward Falls Initiative',
    adminLabel: 'FFI Admin',
    logo: '/FFI.png',
    welcomeMessage: 'Welcome back{name} 👋',

    statCards: [
        { label: 'Published Posts', statKey: 'posts', icon: FileText, bg: 'bg-[#00baa3]/10', accentHex: '#00baa3', href: '/admin-dashboard/posts' },
        { label: 'Team Members', statKey: 'team', icon: Users, bg: 'bg-[#efc94c]/15', accentHex: '#efc94c', href: '/admin-dashboard/team' },
        { label: 'Bank Accounts', statKey: 'accounts', icon: CreditCard, bg: 'bg-[#d55342]/10', accentHex: '#d55342', href: '/admin-dashboard/accounts' },
        { label: 'Media Files', statKey: 'media', icon: Image, bg: 'bg-indigo-50', accentHex: '#6366f1', href: '/admin-dashboard/media' },
    ],

    quickActions: [
        { href: '/admin-dashboard/posts/new', icon: PenSquare, label: 'Write a Post', sub: 'Create new content', accentHex: '#00baa3' },
        { href: '/admin-dashboard/posts', icon: FileText, label: 'Manage Posts', sub: 'Edit or delete posts', accentHex: '#00baa3' },
        { href: '/admin-dashboard/team', icon: Users, label: 'Team Members', sub: 'Update the team', accentHex: '#efc94c' },
        { href: '/admin-dashboard/pages/homepage', icon: LayoutDashboard, label: 'Edit Homepage', sub: 'Update page content', accentHex: '#d55342' },
        { href: '/admin-dashboard/accounts', icon: CreditCard, label: 'Bank Accounts', sub: 'Manage donation details', accentHex: '#6366f1' },
        { href: '/admin-dashboard/media', icon: Image, label: 'Media Library', sub: 'Browse uploaded files', accentHex: '#00baa3' },
    ],

    features: {
        passwordChange: true,
        mediaLibrary: true,
        teamManagement: true,
        postManagement: true,
        pageEditing: true,
        accountManagement: true,
    }
}

export default config