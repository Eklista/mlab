import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Menu,
  Bell,
  Search,
  Plus
} from 'lucide-react'

interface MobileBottomBarProps {
  onMenuToggle?: () => void
  className?: string
}

const MobileBottomBar = ({ onMenuToggle, className = '' }: MobileBottomBarProps): React.JSX.Element => {
  const location = useLocation()
  const [notificationCount] = useState(5)

  const isActive = (path: string) => location.pathname === path

  const bottomBarItems = [
    {
      id: 'dashboard',
      icon: <Home className="w-6 h-6" />,
      label: 'Inicio',
      path: '/admin/dashboard',
      isLink: true
    },
    {
      id: 'menu',
      icon: <Menu className="w-6 h-6" />,
      label: 'Menú',
      action: onMenuToggle,
      isLink: false
    },
    {
      id: 'search',
      icon: <Search className="w-6 h-6" />,
      label: 'Buscar',
      path: '/admin/search',
      isLink: true
    },
    {
      id: 'notifications',
      icon: <Bell className="w-6 h-6" />,
      label: 'Alertas',
      path: '/admin/notifications',
      badge: notificationCount,
      isLink: true
    }
  ]

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800/50 px-4 py-3 z-50 md:hidden ${className}`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {bottomBarItems.map((item) => {
          const isItemActive = item.isLink ? isActive(item.path ?? '') : false
          
          if (item.isLink && item.path) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`relative flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 min-w-[60px] ${
                  isItemActive
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <div className={`relative transition-all duration-300 ${
                  isItemActive ? 'scale-110' : 'hover:scale-105'
                }`}>
                  {item.icon}
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isItemActive ? 'text-white' : 'text-zinc-500'
                }`}>
                  {item.label}
                </span>
                {isItemActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={item.action}
              className="relative flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 min-w-[60px] text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            >
              <div className="relative transition-all duration-300 hover:scale-105">
                {item.icon}
              </div>
              <span className="text-xs font-medium text-zinc-500">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* FAB (Floating Action Button) - opcional */}
      <button className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center shadow-2xl shadow-black/20 hover:scale-105 transition-all duration-300">
        <Plus className="w-6 h-6 text-zinc-900" />
      </button>
    </div>
  )
}

export default MobileBottomBar