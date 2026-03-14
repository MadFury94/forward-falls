'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, PenSquare, BarChart3, Settings, LogOut } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navItems = [
    { title: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard },
    { title: 'All Posts', href: '/admin-dashboard/posts', icon: FileText },
    { title: 'New Post', href: '/admin-dashboard/posts/new', icon: PenSquare },
    { title: 'Analytics', href: '#', icon: BarChart3 },
    { title: 'Settings', href: '#', icon: Settings },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild className='hover:bg-transparent active:bg-transparent'>
                            <Link href='/admin-dashboard'>
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                    <img src='/FFI.png' alt='FFI' className='size-4 object-contain brightness-0 invert' />
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
                    <SidebarGroupLabel>General</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map(({ title, href, icon: Icon }) => {
                            const isActive =
                                href === '/admin-dashboard'
                                    ? pathname === href
                                    : pathname.startsWith(href)
                            return (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton asChild isActive={isActive} tooltip={title}>
                                        <Link href={href}>
                                            <Icon />
                                            <span>{title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
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
