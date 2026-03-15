import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Mobile top bar with hamburger */}
                <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white md:hidden">
                    <SidebarTrigger className="text-dark-grey" />
                    <span className="font-semibold text-dark-grey text-sm">FFI Admin</span>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
