// src/layouts/AdminLayout/AdminLayout.tsx
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/auth/context/AuthContext'
import AdminSidebar from './components/AdminSidebar'
import AdminNavbar from './components/AdminNavbar'
import AdminRightSidebar from './components/AdminRightSidebar'
import LockScreen from './components/LockScreen'
import { 
  MenuIcon, 
  XIcon,
  ClipboardListIcon,
  BellIcon,
  GroupIcon,
  CalendarDaysIcon
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export type RightSidebarSection = 'tasks' | 'notifications' | 'users' | 'calendar' | null

const AdminLayout = ({ children }: AdminLayoutProps): React.JSX.Element => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  // Estado del sidebar principal
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('adminSidebarCollapsed')
    return saved ? JSON.parse(saved) : false
  })
  
  // Estado del sidebar derecho
  const [rightSidebarSection, setRightSidebarSection] = useState<RightSidebarSection>(null)
  
  // Estados para móvil
  const [mobileLeftSidebarOpen, setMobileLeftSidebarOpen] = useState(false)
  const [mobileRightSidebarOpen, setMobileRightSidebarOpen] = useState(false)
  const [mobilePanelSection, setMobilePanelSection] = useState<RightSidebarSection>('tasks')
  
  // Estado de bloqueo (placeholder - implementar según tu lógica de auth)
  const [isLocked, setIsLocked] = useState(false)

  // Guardar estado del sidebar
  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  // Guardar última ruta
  useEffect(() => {
    if (isAuthenticated && !isLocked) {
      localStorage.setItem('lastPath', location.pathname)
    }
  }, [location.pathname, isAuthenticated, isLocked])

  // Si está bloqueado, mostrar pantalla de bloqueo
  if (isAuthenticated && isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />
  }

  const toggleSidebarCollapse = (): void => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleRightSidebarItemClick = (section: RightSidebarSection): void => {
    if (rightSidebarSection === section) {
      setRightSidebarSection(null)
    } else {
      setRightSidebarSection(section)
    }
  }

  const closeRightSidebar = (): void => {
    setRightSidebarSection(null)
  }

  // Funciones para móvil - solo una barra a la vez
  const toggleMobileLeftSidebar = (): void => {
    if (mobileRightSidebarOpen) {
      setMobileRightSidebarOpen(false)
      setRightSidebarSection(null)
    }
    setMobileLeftSidebarOpen(!mobileLeftSidebarOpen)
  }

  const toggleMobileRightSidebar = (): void => {
    if (mobileLeftSidebarOpen) {
      setMobileLeftSidebarOpen(false)
    }
    setMobileRightSidebarOpen(!mobileRightSidebarOpen)
    if (!mobileRightSidebarOpen) {
      setRightSidebarSection(mobilePanelSection)
    } else {
      setRightSidebarSection(null)
    }
  }

  const handleMobilePanelSectionChange = (section: RightSidebarSection): void => {
    setMobilePanelSection(section)
    setRightSidebarSection(section)
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden relative">
      {/* Overlay para móviles - sidebar izquierdo */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity bg-black/50 lg:hidden ${
          mobileLeftSidebarOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
        onClick={() => setMobileLeftSidebarOpen(false)}
      />

      {/* Overlay para móviles - sidebar derecho */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity bg-black/50 lg:hidden ${
          mobileRightSidebarOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
        onClick={() => setMobileRightSidebarOpen(false)}
      />

      {/* Sidebar izquierdo - Desktop */}
      <div 
        className={`hidden lg:flex inset-y-0 left-0 z-30 transition-all flex-col ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        <AdminSidebar 
          onClose={() => {}} 
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      </div>

      {/* Sidebar izquierdo - Móvil */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-72 transition-all transform lg:hidden ${
          mobileLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar 
          onClose={() => setMobileLeftSidebarOpen(false)} 
          collapsed={false}
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden lg:p-3 md:p-2 p-1 lg:pb-3 md:pb-2 pb-1">
        <div className="flex flex-col flex-1 bg-gray-800 lg:rounded-xl md:rounded-lg rounded-md shadow-lg overflow-hidden lg:mb-0 md:mb-12 mb-10">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto bg-gray-50 lg:p-6 md:p-4 p-3 lg:pt-4 md:pt-3 pt-2 pb-14 sm:pb-3">
            {children}
          </main>
        </div>
      </div>

      {/* Sidebar derecho - Desktop */}
      <div className={`hidden lg:flex transition-all duration-300 ${
        rightSidebarSection ? 'w-96' : 'w-20'
      } bg-gray-900`}>
        {/* Barra de iconos siempre visible */}
        <div className="w-20 flex flex-col">
          <div className="p-4 border-b border-white/10"></div>
          <div className="p-2 space-y-2">
            <button 
              onClick={() => handleRightSidebarItemClick('tasks')}
              className={`w-full flex flex-col items-center p-3 rounded-lg transition-all duration-200 group ${
                rightSidebarSection === 'tasks' 
                  ? 'bg-white/10 text-purple-400' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              title="Mis Tareas"
            >
              <ClipboardListIcon className="h-6 w-6" />
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></span>
            </button>
            
            <button 
              onClick={() => handleRightSidebarItemClick('notifications')}
              className={`w-full flex flex-col items-center p-3 rounded-lg transition-all duration-200 group ${
                rightSidebarSection === 'notifications' 
                  ? 'bg-white/10 text-purple-400' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              title="Notificaciones"
            >
              <BellIcon className="h-6 w-6" />
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-1"></span>
            </button>

            <button 
              onClick={() => handleRightSidebarItemClick('users')}
              className={`w-full flex flex-col items-center p-3 rounded-lg transition-all duration-200 group ${
                rightSidebarSection === 'users' 
                  ? 'bg-white/10 text-purple-400' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              title="Usuarios Online"
            >
              <GroupIcon className="h-6 w-6" />
              <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
            </button>

            <button 
              onClick={() => handleRightSidebarItemClick('calendar')}
              className={`w-full flex flex-col items-center p-3 rounded-lg transition-all duration-200 group ${
                rightSidebarSection === 'calendar' 
                  ? 'bg-white/10 text-purple-400' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              title="Mi Agenda"
            >
              <CalendarDaysIcon className="h-6 w-6" />
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
            </button>
          </div>
        </div>
        
        {/* Panel expandido */}
        {rightSidebarSection && (
          <div className="flex-1 border-l border-white/10">
            <AdminRightSidebar 
              activeSection={rightSidebarSection}
              onClose={closeRightSidebar}
            />
          </div>
        )}
      </div>

      {/* Sidebar derecho - Móvil con tabs */}
      <div 
        className={`fixed inset-y-0 right-0 z-30 w-80 transition-all transform lg:hidden ${
          mobileRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-gray-900`}
      >
        {/* Header con tabs */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Panel de Control</h2>
            <button 
              className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              onClick={() => setMobileRightSidebarOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Tabs para cambiar sección */}
          <div className="flex bg-white/10 rounded-lg p-1 text-xs">
            <button 
              onClick={() => handleMobilePanelSectionChange('calendar')}
              className={`flex-1 py-2 px-2 rounded-md font-medium transition-all duration-200 ${
                mobilePanelSection === 'calendar' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Agenda
            </button>
            <button 
              onClick={() => handleMobilePanelSectionChange('tasks')}
              className={`flex-1 py-2 px-2 rounded-md font-medium transition-all duration-200 ${
                mobilePanelSection === 'tasks' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Tareas
            </button>
            <button 
              onClick={() => handleMobilePanelSectionChange('notifications')}
              className={`flex-1 py-2 px-2 rounded-md font-medium transition-all duration-200 ${
                mobilePanelSection === 'notifications' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Actividad
            </button>
            <button 
              onClick={() => handleMobilePanelSectionChange('users')}
              className={`flex-1 py-2 px-2 rounded-md font-medium transition-all duration-200 ${
                mobilePanelSection === 'users' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Usuarios
            </button>
          </div>
        </div>
        
        {/* Contenido según la sección */}
        <div className="flex-1 overflow-hidden">
          <AdminRightSidebar 
            activeSection={mobilePanelSection}
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Bottom bar móvil */}
      <div className="fixed bottom-0 left-0 right-0 z-10 lg:hidden bg-gray-900 px-3 py-2">
        <div className="flex items-center justify-center max-w-xs mx-auto">
          <button
            onClick={toggleMobileLeftSidebar}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 flex-1 ${
              mobileLeftSidebarOpen 
                ? 'bg-purple-600 text-white' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <MenuIcon className="h-4 w-4" />
            <span className="text-xs mt-0.5 font-medium">Menú</span>
          </button>

          <button
            onClick={toggleMobileRightSidebar}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 flex-1 ${
              mobileRightSidebarOpen 
                ? 'bg-purple-600 text-white' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ClipboardListIcon className="h-4 w-4" />
            <span className="text-xs mt-0.5 font-medium">Panel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout