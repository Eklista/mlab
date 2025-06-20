import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home,
  FolderOpen,
  Package,
  Users,
  UserCheck,
  Calendar,
  Settings,
  MoreHorizontal,
  ChevronRight,
  Mic,
  GraduationCap,
  Folder,
  PlayCircle,
  Star,
  X
} from 'lucide-react'

interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'right' | 'left'
}

const Tooltip = ({ children, content, side = 'right' }: TooltipProps) => (
  <div className="group relative">
    {children}
    <div className={`absolute ${side === 'right' ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 px-3 py-2 bg-zinc-800 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-zinc-700`}>
      {content}
      <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-800 border-l border-t border-zinc-700 rotate-45 ${
        side === 'right' ? '-left-1' : '-right-1'
      }`} />
    </div>
  </div>
)

interface SubMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: number
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path?: string
  badge?: number
  subItems?: SubMenuItem[]
}

interface MainSidebarProps {
  navItems: NavItem[]
  activeSubmenu: string | null
  onItemClick: (item: NavItem) => void
  isParentActive: (item: NavItem) => boolean
  isMobile?: boolean
  onClose?: (() => void) | undefined
}

const MainSidebar = ({ navItems, activeSubmenu, onItemClick, isParentActive, isMobile = false, onClose }: MainSidebarProps) => (
  <div className={`${isMobile ? 'w-64' : 'w-16'} bg-zinc-950 border-r border-zinc-700/50 flex flex-col relative`}>
    {/* Logo */}
    <div className={`${isMobile ? 'p-4' : 'p-3'} border-b border-zinc-700/30 relative flex items-center ${isMobile ? 'justify-between' : 'justify-center'}`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-stone-50 to-white rounded-xl flex items-center justify-center">
          <img src="/logo-white.png" alt="Medialab" className="w-6 h-6 filter invert" />
        </div>
        {isMobile && (
          <div>
            <h1 className="text-white font-bold text-lg">Medialab</h1>
            <p className="text-zinc-400 text-sm">Personal plan</p>
          </div>
        )}
      </div>
      
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>

    {/* Navigation */}
    <nav className={`flex-1 ${isMobile ? 'p-3' : 'p-2'} relative`}>
      <div className="space-y-1">
        {navItems.map((item) => (
          isMobile ? (
            // Vista móvil expandida
            <div key={item.id}>
              {item.subItems ? (
                <button
                  onClick={() => onItemClick(item)}
                  className={`relative w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    isParentActive(item)
                      ? 'bg-gradient-to-r from-stone-50/20 to-white/20 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    isParentActive(item) ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full font-bold bg-stone-50/20 text-white">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    activeSubmenu === item.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ) : (
                <Link
                  to={item.path || '#'}
                  onClick={onClose}
                  className={`relative w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    isParentActive(item)
                      ? 'bg-gradient-to-r from-stone-50/20 to-white/20 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    isParentActive(item) ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full font-bold bg-stone-50/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
              
              {/* Submenu móvil */}
              {item.subItems && activeSubmenu === item.id && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        location.pathname === subItem.path
                          ? 'bg-stone-50/10 text-stone-50'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                      }`}
                    >
                      {subItem.icon}
                      <span className="text-sm">{subItem.label}</span>
                      {subItem.badge && (
                        <span className="px-1.5 py-0.5 text-xs rounded-full font-bold bg-zinc-800/50 text-zinc-400 ml-auto">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Vista desktop con tooltips
            <Tooltip key={item.id} content={item.label}>
              {item.subItems ? (
                <button
                  onClick={() => onItemClick(item)}
                  className={`relative w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                    isParentActive(item)
                      ? 'bg-gradient-to-r from-stone-50/20 to-white/20 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    isParentActive(item) ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs text-zinc-900 font-bold">{item.badge}</span>
                    </div>
                  )}
                  
                  <ChevronRight className={`absolute bottom-1 right-1 w-3 h-3 transition-transform duration-300 ${
                    activeSubmenu === item.id ? 'rotate-90' : ''
                  }`} />
                  
                  {isParentActive(item) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-stone-50 to-white rounded-r-full" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`relative w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                    isParentActive(item)
                      ? 'bg-gradient-to-r from-stone-50/20 to-white/20 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    isParentActive(item) ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs text-zinc-900 font-bold">{item.badge}</span>
                    </div>
                  )}
                  
                  {isParentActive(item) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-stone-50 to-white rounded-r-full" />
                  )}
                </Link>
              )}
            </Tooltip>
          )
        ))}
      </div>
    </nav>

    {/* Bottom section */}
    <div className={`${isMobile ? 'p-3' : 'p-2'} border-t border-zinc-700/30 relative`}>
      {isMobile ? (
        <button className="relative flex items-center space-x-3 w-full px-3 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300">
          <MoreHorizontal className="w-5 h-5" />
          <span className="font-medium text-sm">Más opciones</span>
        </button>
      ) : (
        <Tooltip content="Más opciones">
          <button className="relative flex items-center justify-center w-full p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group">
            <div className="transition-all duration-300 group-hover:scale-105">
              <MoreHorizontal className="w-5 h-5" />
            </div>
          </button>
        </Tooltip>
      )}
    </div>
  </div>
)

interface SecondarySidebarProps {
  activeSubmenu: string | null
  navItems: NavItem[]
  isActive: (path: string) => boolean
  onClose: () => void
}

const SecondarySidebar = ({ activeSubmenu, navItems, isActive, onClose }: SecondarySidebarProps) => (
  <div className={`bg-stone-50 border-r border-stone-200 transition-all duration-300 hidden md:block ${
    activeSubmenu ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'
  }`}>
    {activeSubmenu && (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-zinc-900 font-semibold text-lg">
                {navItems.find(item => item.id === activeSubmenu)?.label}
              </h3>
              <p className="text-zinc-600 text-sm mt-1">
                {navItems.find(item => item.id === activeSubmenu)?.subItems?.length} elementos
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-stone-200 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            {navItems
              .find(item => item.id === activeSubmenu)
              ?.subItems?.map((subItem) => (
                <Link
                  key={subItem.id}
                  to={subItem.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive(subItem.path)
                      ? 'bg-zinc-900 text-white shadow-lg'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-stone-100'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    isActive(subItem.path) ? 'scale-110 text-white' : 'group-hover:scale-105'
                  }`}>
                    {subItem.icon}
                  </div>
                  <span className="font-medium text-sm flex-1">{subItem.label}</span>
                  {subItem.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                      isActive(subItem.path)
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-200 text-zinc-600'
                    }`}>
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    )}
  </div>
)

interface AdminSidebarProps {
  className?: string
  isMobile?: boolean
  onClose?: () => void
}

const AdminSidebar = ({ className = '', isMobile = false, onClose }: AdminSidebarProps): React.JSX.Element => {
  const location = useLocation()
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/admin/dashboard'
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: <Calendar className="w-5 h-5" />,
      path: '/admin/calendar'
    },
    {
      id: 'projects',
      label: 'Proyectos',
      icon: <FolderOpen className="w-5 h-5" />,
      badge: 12,
      subItems: [
        {
          id: 'projects-general',
          label: 'General',
          icon: <Folder className="w-4 h-4" />,
          path: '/admin/projects/general',
          badge: 5
        },
        {
          id: 'projects-podcast',
          label: 'Podcast',
          icon: <Mic className="w-4 h-4" />,
          path: '/admin/projects/podcast',
          badge: 3
        },
        {
          id: 'projects-courses',
          label: 'Cursos',
          icon: <GraduationCap className="w-4 h-4" />,
          path: '/admin/projects/courses',
          badge: 4
        },
        {
          id: 'projects-videos',
          label: 'Videos',
          icon: <PlayCircle className="w-4 h-4" />,
          path: '/admin/projects/videos'
        }
      ]
    },
    {
      id: 'inventory',
      label: 'Inventario',
      icon: <Package className="w-5 h-5" />,
      path: '/admin/inventory'
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        {
          id: 'users-all',
          label: 'Todos los usuarios',
          icon: <Users className="w-4 h-4" />,
          path: '/admin/users/all'
        },
        {
          id: 'users-admins',
          label: 'Administradores',
          icon: <Star className="w-4 h-4" />,
          path: '/admin/users/admins'
        },
        {
          id: 'users-clients',
          label: 'Clientes',
          icon: <UserCheck className="w-4 h-4" />,
          path: '/admin/users/clients'
        }
      ]
    },
    {
      id: 'requests',
      label: 'Solicitudes',
      icon: <UserCheck className="w-5 h-5" />,
      path: '/admin/requests',
      badge: 8
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings'
    }
  ]

  const isActive = (path: string) => location.pathname === path
  
  const isParentActive = (item: NavItem) => {
    if (item.path && isActive(item.path)) return true
    if (item.subItems) {
      return item.subItems.some(subItem => isActive(subItem.path))
    }
    return false
  }

  const handleMainItemClick = (item: NavItem) => {
    if (item.subItems) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id)
    } else {
      setActiveSubmenu(null)
    }
  }

  return (
    <div className={`flex ${className}`}>
      <MainSidebar 
        navItems={navItems}
        activeSubmenu={activeSubmenu}
        onItemClick={handleMainItemClick}
        isParentActive={isParentActive}
        isMobile={isMobile}
        onClose={onClose}
      />
      {/* Secondary Sidebar - Solo en desktop */}
      {!isMobile && (
        <SecondarySidebar 
          activeSubmenu={activeSubmenu}
          navItems={navItems}
          isActive={isActive}
          onClose={() => setActiveSubmenu(null)}
        />
      )}
    </div>
  )
}

export default AdminSidebar