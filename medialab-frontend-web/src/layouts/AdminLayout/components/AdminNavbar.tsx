// src/layouts/AdminLayout/components/AdminNavbar.tsx
import { useState } from 'react'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import {
  Search,
  Bell,
  HelpCircle,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  User
} from 'lucide-react'

const AdminNavbar = (): React.JSX.Element => {
  const { user, logout } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = (): void => {
    logout()
    setIsUserMenuOpen(false)
  }

  const closeUserMenu = (): void => {
    setIsUserMenuOpen(false)
  }

  // Early return si no hay usuario
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <header className="bg-zinc-950 border-b border-zinc-800/50 px-6 py-4 sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div>
          <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar en el sistema..."
              className="pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 w-72 text-sm backdrop-blur-sm transition-all duration-300"
            />
          </div>

          {/* Quick action button */}
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-stone-50 to-white hover:from-white hover:to-stone-50 text-zinc-900 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105">
            <Plus className="w-4 h-4" />
            <span>Nuevo</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></span>
          </button>

          {/* Help */}
          <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group">
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 pl-4 border-l border-zinc-700/50 hover:bg-zinc-800/30 rounded-r-xl transition-all duration-300 pr-3 py-1"
            >
              <div className="text-right">
                <p className="text-white text-sm font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-zinc-400 text-xs">{user.email}</p>
              </div>
             
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-stone-50 to-white rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-zinc-900 text-sm font-bold">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} />
              </div>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                {/* Backdrop para cerrar el menú al hacer clic fuera */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={closeUserMenu}
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-zinc-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-stone-50 to-white rounded-xl flex items-center justify-center">
                        <span className="text-zinc-900 text-base font-bold">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-zinc-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button 
                      onClick={closeUserMenu}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Mi perfil</span>
                    </button>
                    <button 
                      onClick={closeUserMenu}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Configuración</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-zinc-700/50 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar