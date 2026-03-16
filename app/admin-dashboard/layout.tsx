import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'
import AdminAuthGuard from '@/components/admin/AdminAuthGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthGuard>
            <SidebarProvider>
                <div className="flex h-screen overflow-hidden w-full">
                    <AppSidebar />
                    <SidebarInset className="flex-1 overflow-y-auto">
                        <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white md:hidden sticky top-0 z-20">
                            <SidebarTrigger className="text-dark-grey" />
                            <span className="font-semibold text-dark-grey text-sm">FFI Admin</span>
                        </header>
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </AdminAuthGuard>
    )
}
