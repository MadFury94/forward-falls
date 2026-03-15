'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
    LayoutDashboard, FileText, PenSquare, LogOut,
    Users, Image, CreditCard, ChevronDown, UserPlus
} from 'lucide-react'
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarGroupLabel, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navGroups = [
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

export function AppSidebar() {
    const pathname = usePathname()

    // Track which groups are open — default open if current path is inside
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {}
        navGroups.forEach((g) => {
            if (g.basePath) init[g.title] = pathname.startsWith(g.basePath)
        })
        return init
    })

    const toggle = (title: string) =>
        setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }))

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href)

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild className='hover:bg-transparent active:bg-transparent'>
                            <Link href='/admin-dashboard'>
                                <div className='flex aspect-square size-10 items-center justify-center rounded-lg overflow-hidden'>
                                    <img src='/FFI.png' alt='FFI' className='size-10 object-contain' />
                                </div>
                                <div className='grid flex-1 text-start text-sm leading-tight'>
                                    <span className='truncate font-semibold'>FFI Admin</span>
                                    <span className='truncate text-xs text-sidebar-foreground/60'>Forward Falls Initiative</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {navGroups.map((group) => {
                            // Simple link (no children)
                            if (!group.children) {
                                return (
                                    <SidebarMenuItem key={group.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive(group.href!, group.exact)}
                                            tooltip={group.title}
                                        >
                                            <Link href={group.href!}>
                                                <group.icon />
                                                <span>{group.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }

                            // Collapsible group with children
                            const open = !!openGroups[group.title]
                            return (
                                <Collapsible key={group.title} open={open} onOpenChange={() => toggle(group.title)} asChild>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                isActive={!open && pathname.startsWith(group.basePath!)}
                                                tooltip={group.title}
                                                className='w-full'
                                            >
                                                <group.icon />
                                                <span>{group.title}</span>
                                                <ChevronDown
                                                    className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                                                />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.children.map((child) => (
                                                    <SidebarMenuSubItem key={child.href}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isActive(child.href, child.exact)}
                                                        >
                                                            <Link href={child.href}>{child.title}</Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip='Logout'>
                            <Link href='/admin-login' className='text-sidebar-foreground/70 hover:text-destructive'>
                                <LogOut />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarFallback className='rounded-lg'>AD</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-start text-sm leading-tight'>
                                <span className='truncate font-semibold'>Admin</span>
                                <span className='truncate text-xs text-sidebar-foreground/60'>super_admin</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
