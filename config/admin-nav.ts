// ─────────────────────────────────────────────────────────────
// admin-nav.ts
// Admin sidebar navigation and dashboard card config.
// Edit here to add/remove nav items or dashboard shortcuts.
// ─────────────────────────────────────────────────────────────

import {
    LayoutDashboard, FileText, Users, Image,
    CreditCard, Globe, PenSquare,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavChild {
    title: string
    href: string
    exact?: boolean
}

export interface NavGroup {
    title: string
    icon: LucideIcon
    href?: string
    exact?: boolean
    basePath?: string
    children?: NavChild[]
}

export const navGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        href: '/admin-dashboard',
        icon: LayoutDashboard,
        exact: true,
    },
    {
        title: 'Posts',
        icon: FileText,
        basePath: '/admin-dashboard/posts',
        children: [
            { title: 'All Posts', href: '/admin-dashboard/posts', exact: true },
            { title: 'New Post', href: '/admin-dashboard/posts/new' },
        ],
    },
    {
        title: 'Team Members',
        icon: Users,
        basePath: '/admin-dashboard/team',
        children: [
            { title: 'All Members', href: '/admin-dashboard/team', exact: true },
            { title: 'New Member', href: '/admin-dashboard/team/new' },
        ],
    },
    {
        title: 'Pages',
        icon: Globe,
        basePath: '/admin-dashboard/pages',
        children: [
            { title: 'Homepage', href: '/admin-dashboard/pages/homepage' },
        ],
    },
    {
        title: 'Account Numbers',
        href: '/admin-dashboard/accounts',
        icon: CreditCard,
    },
    {
        title: 'Media Library',
        href: '/admin-dashboard/media',
        icon: Image,
    },
]

export interface StatCardConfig {
    label: string
    icon: LucideIcon
    /** key in the stats object returned by the dashboard fetch */
    statKey: 'posts' | 'team' | 'accounts' | 'media'
    href: string
    /** tailwind bg class */
    bg: string
    /** hex colour for the icon */
    accentHex: string
}

export interface QuickActionConfig {
    href: string
    icon: LucideIcon
    label: string
    sub: string
    /** hex colour */
    accentHex: string
}

export const statCards: StatCardConfig[] = [
    { label: 'Published Posts', statKey: 'posts', icon: FileText, bg: 'bg-[#00baa3]/10', accentHex: '#00baa3', href: '/admin-dashboard/posts' },
    { label: 'Team Members', statKey: 'team', icon: Users, bg: 'bg-[#efc94c]/15', accentHex: '#efc94c', href: '/admin-dashboard/team' },
    { label: 'Bank Accounts', statKey: 'accounts', icon: CreditCard, bg: 'bg-[#d55342]/10', accentHex: '#d55342', href: '/admin-dashboard/accounts' },
    { label: 'Media Files', statKey: 'media', icon: Image, bg: 'bg-indigo-50', accentHex: '#6366f1', href: '/admin-dashboard/media' },
]

export const quickActions: QuickActionConfig[] = [
    { href: '/admin-dashboard/posts/new', icon: PenSquare, label: 'Write a Post', sub: 'Create new content', accentHex: '#00baa3' },
    { href: '/admin-dashboard/posts', icon: FileText, label: 'Manage Posts', sub: 'Edit or delete posts', accentHex: '#00baa3' },
    { href: '/admin-dashboard/team', icon: Users, label: 'Team Members', sub: 'Update the team', accentHex: '#efc94c' },
    { href: '/admin-dashboard/pages/homepage', icon: LayoutDashboard, label: 'Edit Homepage', sub: 'Update page content', accentHex: '#d55342' },
    { href: '/admin-dashboard/accounts', icon: CreditCard, label: 'Bank Accounts', sub: 'Manage donation details', accentHex: '#6366f1' },
    { href: '/admin-dashboard/media', icon: Image, label: 'Media Library', sub: 'Browse uploaded files', accentHex: '#00baa3' },
]
