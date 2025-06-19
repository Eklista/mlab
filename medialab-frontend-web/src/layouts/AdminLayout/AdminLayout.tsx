import { useState } from 'react'
import { 
  Home, 
  FolderOpen, 
  Package, 
  Users, 
  UserCheck, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '@/modules/auth/context/AuthContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface MenuSection {
  id: string
  label: string
  icon: React.ReactNode
  isExpanded?: boolean
  subItems?: {
    id: string
    label: string
    href: string
    badge?: number
  }[]
}

const AdminLayout = ({ children }: AdminLayoutProps): React.JSX.Element => {
  const { user, logout } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['projects'])

  const toggleSection = (sectionId: string): void => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const menuSections: MenuSection[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'projects',
      label: 'Proyectos',
      icon: <FolderOpen className="w-5 h-5" />,
      subItems: [
        { id: 'all-projects', label: 'Todos', href: '/projects' },
        { id: 'active-projects', label: 'Activos', href: '/projects/active', badge: 12 },
        { id: 'completed-projects', label: 'Completados', href: '/projects/completed' },
        { id: 'archived-projects', label: 'Archivados', href: '/projects/archived' }
      ]
    },
    {
      id: 'inventory',
      label: 'Inventario',
      icon: <Package className="w-5 h-5" />,
      subItems: [
        { id: 'equipment', label: 'Equipos', href: '/inventory/equipment' },
        { id: 'maintenance', label: 'Mantenimiento', href: '/inventory/maintenance', badge: 3 },
        { id: 'requests', label: 'Solicitudes', href: '/inventory/requests' }
      ]
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { id: 'staff', label: 'Personal', href: '/users/staff' },
        { id: 'clients', label: 'Clientes', href: '/users/clients' },
        { id: 'permissions', label: 'Permisos', href: '/users/permissions' }
      ]
    },
    {
      id: 'service-requests',
      label: 'Solicitudes',
      icon: <UserCheck className="w-5 h-5" />,
      subItems: [
        { id: 'pending', label: 'Pendientes', href: '/requests/pending', badge: 8 },
        { id: 'in-progress', label: 'En Proceso', href: '/requests/in-progress' },
        { id: 'completed', label: 'Completadas', href: '/requests/completed' }
      ]
    }
  ]

  const bottomMenuItems = [
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: <Bell className="w-5 h-5" />,
      badge: 5
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="w-5 h-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-72'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <img src="/logo-white.png" alt="Medialab" className="h-8 w-auto filter brightness-0" />
                  <span className="font-semibold text-gray-900">Medialab</span>
                </div>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {menuSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => section.subItems && toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group ${
                      section.id === 'projects' ? 'bg-gray-900 text-white hover:bg-gray-800' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      {!isSidebarCollapsed && <span className="font-medium">{section.label}</span>}
                    </div>
                    {!isSidebarCollapsed && section.subItems && (
                      expandedSections.includes(section.id) ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* Sub Items */}
                  {!isSidebarCollapsed && section.subItems && expandedSections.includes(section.id) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {section.subItems.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors group"
                        >
                          <span className="text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Menu */}
          <div className="border-t border-gray-200 p-3 space-y-1">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.badge && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {/* User Profile & Logout */}
            <div className="pt-3 border-t border-gray-200">
              {!isSidebarCollapsed && (
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              )}
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                {!isSidebarCollapsed && <span className="font-medium">Cerrar Sesión</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout