import { useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminNavbar from './components/AdminNavbar'
import MobileBottomBar from './components/MobileBottomBar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps): React.JSX.Element => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <AdminSidebar className="hidden md:flex" />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileSidebar}
          />
          
          {/* Mobile Sidebar */}
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <AdminSidebar 
              className="h-full" 
              isMobile={true} 
              onClose={closeMobileSidebar} 
            />
          </div>
        </>
      )}
     
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <AdminNavbar />
       
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-zinc-950 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomBar onMenuToggle={handleMobileMenuToggle} />
    </div>
  )
}

export default AdminLayout