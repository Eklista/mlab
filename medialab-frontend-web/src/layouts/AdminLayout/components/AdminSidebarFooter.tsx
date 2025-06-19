// src/layouts/AdminLayout/components/AdminSidebarFooter.tsx
import { useAuth } from '@/modules/auth/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Lock,
  User,
  LogOut,
  Bell,
  Settings 
} from 'lucide-react'

interface AdminSidebarFooterProps {
  collapsed?: boolean
}

const AdminSidebarFooter = ({ collapsed = false }: AdminSidebarFooterProps): React.JSX.Element => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Función para bloquear sesión (placeholder - implementar según tu lógica)
  const handleLock = (): void => {
    console.log('Bloquear sesión')
    localStorage.setItem('lastPathBeforeLock', window.location.pathname)
    // Aquí implementarías tu lógica de bloqueo
  }

  // Navegación a perfil
  const handleNavigateToProfile = (): void => {
    if (user?.id) {
      navigate(`/admin/users/${user.id}`)
    }
  }

  // Navegación a configuraciones
  const handleNavigateToSettings = (): void => {
    navigate('/admin/settings')
  }

  // Navegación a notificaciones
  const handleNavigateToNotifications = (): void => {
    navigate('/admin/notifications')
  }

  const handleLogout = (): void => {
    logout()
  }

  if (!collapsed) {
    return (
      <div className="p-3 border-t border-white/10 space-y-1">
        {/* Mi perfil */}
        <button
          onClick={handleNavigateToProfile}
          className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white group"
        >
          <User className="h-5 w-5 text-white/60 group-hover:text-white/80 mr-3" />
          <span className="font-medium text-sm">Mi Perfil</span>
        </button>

        {/* Notificaciones */}
        <button
          onClick={handleNavigateToNotifications}
          className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white group"
        >
          <Bell className="h-5 w-5 text-white/60 group-hover:text-white/80 mr-3" />
          <span className="font-medium text-sm">Notificaciones</span>
          <span className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        {/* Configuración */}
        <button
          onClick={handleNavigateToSettings}
          className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white group"
        >
          <Settings className="h-5 w-5 text-white/60 group-hover:text-white/80 mr-3" />
          <span className="font-medium text-sm">Configuración</span>
        </button>
        
        {/* Separador */}
        <div className="border-t border-white/10 my-2"></div>

        {/* Bloquear sesión */}
        <button
          onClick={handleLock}
          className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white group"
        >
          <Lock className="h-5 w-5 text-white/60 group-hover:text-white/80 mr-3" />
          <span className="font-medium text-sm">Bloquear Sesión</span>
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-red-400 hover:text-red-300 group"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium text-sm">Cerrar Sesión</span>
        </button>
        
        {/* Copyright */}
        <div className="mt-4 text-xs text-white/40 text-center">
          <p className="font-medium">Medialab CRM</p>
          <p>© {new Date().getFullYear()} Univ. Galileo</p>
        </div>
      </div>
    )
  }

  // Modo colapsado
  return (
    <div className="p-2 border-t border-white/10 space-y-2">
      {/* Mi perfil colapsado */}
      <button
        onClick={handleNavigateToProfile}
        className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white"
        title="Mi Perfil"
      >
        <User className="h-5 w-5" />
      </button>

      {/* Notificaciones colapsado */}
      <button
        onClick={handleNavigateToNotifications}
        className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white relative"
        title="Notificaciones"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></span>
      </button>

      {/* Configuración colapsado */}
      <button
        onClick={handleNavigateToSettings}
        className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white"
        title="Configuración"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Separador */}
      <div className="border-t border-white/10 my-2"></div>
      
      {/* Bloquear sesión colapsado */}
      <button
        onClick={handleLock}
        className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-white/5 transition-all duration-200 text-white/70 hover:text-white"
        title="Bloquear Sesión"
      >
        <Lock className="h-5 w-5" />
      </button>

      {/* Cerrar sesión colapsado */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-red-400 hover:text-red-300"
        title="Cerrar Sesión"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  )
}

export default AdminSidebarFooter