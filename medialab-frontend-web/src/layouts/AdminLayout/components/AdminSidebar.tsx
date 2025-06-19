// src/layouts/AdminLayout/components/AdminSidebar.tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/auth/context/AuthContext'
import AdminSidebarFooter from './AdminSidebarFooter'
import UserAvatar from './UserAvatar'
import { 
  Home, 
  FolderOpen, 
  Package, 
  Users, 
  UserCheck, 
  Settings,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Calendar
} from 'lucide-react'

interface AdminSidebarProps {
  onClose?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

interface SidebarItemConfig {
  id: string
  title: string
  path?: string
  icon: React.ReactNode
  children?: SidebarItemConfig[]
  isOpen?: boolean
  badge?: number
  permissionRequired?: string
}

const AdminSidebar = ({ onClose, collapsed = false, onToggleCollapse }: AdminSidebarProps): React.JSX.Element => {
  const location = useLocation()
  const { user } = useAuth()
  
  // Estado para manejar la apertura/cierre de menús
  const [menuState, setMenuState] = useState({
    projectsOpen: false,
    inventoryOpen: false,
    usersOpen: false,
    requestsOpen: false
  })

  // Estado para expansión temporal cuando se hace clic en modo colapsado
  const [tempExpanded, setTempExpanded] = useState(false)

  // Configuración del sidebar
  const sidebarItems: SidebarItemConfig[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'calendar',
      title: 'Calendario',
      path: '/admin/calendar',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'projects',
      title: 'Proyectos',
      icon: <FolderOpen className="w-5 h-5" />,
      isOpen: menuState.projectsOpen,
      children: [
        { id: 'all-projects', title: 'Todos', path: '/admin/projects', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'active-projects', title: 'Activos', path: '/admin/projects/active', icon: <FolderOpen className="w-4 h-4" />, badge: 12 },
        { id: 'completed-projects', title: 'Completados', path: '/admin/projects/completed', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'archived-projects', title: 'Archivados', path: '/admin/projects/archived', icon: <FolderOpen className="w-4 h-4" /> }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventario',
      icon: <Package className="w-5 h-5" />,
      isOpen: menuState.inventoryOpen,
      children: [
        { id: 'equipment', title: 'Equipos', path: '/admin/inventory/equipment', icon: <Package className="w-4 h-4" /> },
        { id: 'maintenance', title: 'Mantenimiento', path: '/admin/inventory/maintenance', icon: <Package className="w-4 h-4" />, badge: 3 },
        { id: 'requests', title: 'Solicitudes', path: '/admin/inventory/requests', icon: <Package className="w-4 h-4" /> }
      ]
    },
    {
      id: 'users',
      title: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      isOpen: menuState.usersOpen,
      children: [
        { id: 'staff', title: 'Personal', path: '/admin/users/staff', icon: <Users className="w-4 h-4" /> },
        { id: 'clients', title: 'Clientes', path: '/admin/users/clients', icon: <Users className="w-4 h-4" /> },
        { id: 'permissions', title: 'Permisos', path: '/admin/users/permissions', icon: <Users className="w-4 h-4" /> }
      ]
    },
    {
      id: 'requests',
      title: 'Solicitudes',
      icon: <UserCheck className="w-5 h-5" />,
      isOpen: menuState.requestsOpen,
      children: [
        { id: 'pending', title: 'Pendientes', path: '/admin/requests/pending', icon: <UserCheck className="w-4 h-4" />, badge: 8 },
        { id: 'in-progress', title: 'En Proceso', path: '/admin/requests/in-progress', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'completed', title: 'Completadas', path: '/admin/requests/completed', icon: <UserCheck className="w-4 h-4" /> }
      ]
    },
    {
      id: 'settings',
      title: 'Configuración',
      path: '/admin/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ]

  // Función para verificar si hay items activos en un menú
  const hasActiveItem = (items: SidebarItemConfig[]): boolean => {
    return items.some(item => location.pathname.startsWith(item.path || ''))
  }

  // Auto-abrir menús si hay un item activo
  useEffect(() => {
    const newMenuState = { ...menuState }
    
    sidebarItems.forEach(item => {
      if (item.children && hasActiveItem(item.children)) {
        switch (item.id) {
          case 'projects':
            newMenuState.projectsOpen = true
            break
          case 'inventory':
            newMenuState.inventoryOpen = true
            break
          case 'users':
            newMenuState.usersOpen = true
            break
          case 'requests':
            newMenuState.requestsOpen = true
            break
        }
      }
    })
    
    setMenuState(newMenuState)
  }, [location.pathname])

  // Función para alternar menús
  const toggleMenu = (menuId: string): void => {
    setMenuState(prev => ({
      ...prev,
      [`${menuId}Open`]: !prev[`${menuId}Open` as keyof typeof prev]
    }))
  }

  // Función para manejar clic en menú colapsado
  const handleCollapsedMenuClick = (menuId: string): void => {
    setTempExpanded(true)
    setMenuState(prev => ({
      ...prev,
      [`${menuId}Open`]: true
    }))
  }

  // Función para cerrar expansión temporal
  const closeTempExpansion = (): void => {
    setTempExpanded(false)
    setMenuState({
      projectsOpen: false,
      inventoryOpen: false,
      usersOpen: false,
      requestsOpen: false
    })
  }

  // Función para manejar clic en items
  const handleMenuItemClick = (): void => {
    if (onClose) {
      onClose()
    }
    if (tempExpanded) {
      closeTempExpansion()
    }
  }

  // Determinar si debe mostrar expandido
  const shouldShowExpanded = !collapsed || tempExpanded

  // Renderizar item de menú
  const renderMenuItem = (item: SidebarItemConfig, isCollapsed: boolean = false): React.JSX.Element => {
    if (item.children) {
      const hasActive = hasActiveItem(item.children)
      
      // En modo colapsado, mostrar solo el ícono
      if (isCollapsed && !tempExpanded) {
        return (
          <li key={item.id}>
            <button
              onClick={() => handleCollapsedMenuClick(item.id)}
              className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 w-full relative overflow-hidden group ${
                hasActive ? 'text-purple-400 bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              title={item.title}
            >
              <span className={`text-lg relative z-10 transition-transform duration-200 group-hover:scale-110`}>
                {item.icon}
              </span>
              <span className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
            </button>
          </li>
        )
      }
      
      // Modo expandido
      return (
        <li key={item.id}>
          <button
            onClick={() => toggleMenu(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
              hasActive ? 'text-purple-400 bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center relative z-10">
              <span className="mr-3 text-sm transition-transform group-hover:scale-105">
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.title}</span>
            </div>
            <div className="flex items-center relative z-10">
              <span className={`transition-all duration-200 ${
                item.isOpen ? 'rotate-180' : ''
              }`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
            <span className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
          </button>
          
          {item.isOpen && item.children && (
            <ul className="pl-9 mt-1 space-y-1">
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link
                    to={child.path || '#'}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm group ${
                      location.pathname === child.path 
                        ? 'text-purple-400 bg-white/10 font-medium' 
                        : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                    }`}
                    onClick={handleMenuItemClick}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">
                        {child.icon}
                      </span>
                      <span>{child.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {child.badge && (
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
                          {child.badge}
                        </span>
                      )}
                      <ArrowUpRight className={`h-3 w-3 transition-opacity duration-200 ${
                        location.pathname === child.path 
                          ? 'opacity-100 text-purple-400' 
                          : 'opacity-0 group-hover:opacity-100 text-white/50'
                      }`} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      )
    }
    
    // Items regulares
    if (isCollapsed && !tempExpanded) {
      return (
        <li key={item.id}>
          <Link
            to={item.path || '#'}
            className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
              location.pathname === item.path 
                ? 'bg-white/10 text-purple-400' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
            onClick={handleMenuItemClick}
            title={item.title}
          >
            <span className="text-lg transition-transform group-hover:scale-110 relative z-10">
              {item.icon}
            </span>
            <span className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </li>
      )
    }
    
    return (
      <li key={item.id}>
        <Link
          to={item.path || '#'}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
            location.pathname === item.path 
              ? 'bg-white/10 text-purple-400 font-medium' 
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          onClick={handleMenuItemClick}
        >
          <div className="flex items-center relative z-10">
            <span className="mr-3 text-sm transition-transform group-hover:scale-105">
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.title}</span>
          </div>
          <ArrowUpRight className={`h-4 w-4 transition-all duration-200 relative z-10 ${
            location.pathname === item.path 
              ? 'opacity-100 text-purple-400' 
              : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-white/50'
          }`} />
          <span className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
        </Link>
      </li>
    )
  }

  return (
    <div className={`h-full flex flex-col bg-gray-900 relative transition-all duration-300 ${
      tempExpanded ? 'w-72' : shouldShowExpanded ? 'w-full' : 'w-full'
    }`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10 relative">
        {shouldShowExpanded ? (
          <>
            <div className="flex items-center space-x-3">
              <img src="/logo-white.png" alt="Medialab" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-white">Medialab</span>
            </div>
            {/* Botones según el contexto */}
            {tempExpanded ? (
              <button
                onClick={closeTempExpansion}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white relative overflow-hidden group"
              >
                <X className="h-4 w-4 relative z-10" />
                <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out"></span>
              </button>
            ) : (
              onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white relative overflow-hidden group"
                >
                  <ChevronLeft className="h-4 w-4 relative z-10" />
                  <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out"></span>
                </button>
              )
            )}
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            <span className="text-lg font-bold text-white mb-2">ML</span>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white relative overflow-hidden group"
              >
                <ChevronRight className="h-4 w-4 relative z-10" />
                <span className="absolute inset-0 bg-white/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out"></span>
              </button>
            )}
          </div>
        )}
        
        {/* Botón de cerrar móvil */}
        {onClose && (
          <button 
            className="lg:hidden text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Tarjeta de usuario */}
      {shouldShowExpanded ? (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center">
            <UserAvatar 
              user={user}
              size="lg"
              className="mr-3"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/50 text-xs truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 border-b border-white/10 flex justify-center">
          <UserAvatar 
            user={user}
            size="md"
          />
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        <ul className={`space-y-1 ${shouldShowExpanded ? 'px-3' : 'px-2'}`}>
          {sidebarItems.map(item => renderMenuItem(item, !shouldShowExpanded))}
        </ul>
      </nav>
      
      {/* Footer */}
      <AdminSidebarFooter collapsed={!shouldShowExpanded} />
    </div>
  )
}

export default AdminSidebar