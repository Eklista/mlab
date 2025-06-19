// src/layouts/AdminLayout/components/AdminNavbar.tsx
import { useAuth } from '@/modules/auth/context/AuthContext'
import { Bell, Search } from 'lucide-react'

interface AdminNavbarProps {
  className?: string
}

const AdminNavbar = ({ className }: AdminNavbarProps): React.JSX.Element => {
  const { user } = useAuth()

  // Función para obtener saludo según la hora
  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      return 'Buenos días'
    } else if (hour >= 12 && hour < 18) {
      return 'Buenas tardes'
    } else if (hour >= 18 && hour < 22) {
      return 'Buenas tardes'
    } else {
      return 'Buenas noches'
    }
  }

  // Función para obtener el primer nombre
  const getFirstName = (): string => {
    if (!user) return 'Usuario'
  
    if (user.firstName) {
      return user.firstName
    }
  
    if (user.email) {
      const [firstPart] = user.email.split('@')
      return firstPart ?? 'Usuario'
    }
  
    return 'Usuario'
  }

  // Función para obtener emoji según la hora
  const getGreetingEmoji = (): string => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      return '👋'
    } else if (hour >= 12 && hour < 18) {
      return '✌️'
    } else if (hour >= 18 && hour < 22) {
      return '👌'
    } else {
      return '🤙'
    }
  }

  return (
    <div className={`px-6 py-4 flex items-center justify-between border-b border-gray-700 bg-gray-800 ${className || ''}`}>
      {/* Saludo y mensaje de bienvenida */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-white mb-1 flex items-center gap-2">
          {getTimeBasedGreeting()}, {getFirstName()}!
          <span className="text-2xl">{getGreetingEmoji()}</span>
        </h1>
        <p className="text-sm text-gray-400">
          Gestiona tus proyectos, inventario y solicitudes desde aquí
        </p>
      </div>

      {/* Acciones del navbar */}
      <div className="flex items-center space-x-4">
        {/* Barra de búsqueda */}
        <div className="hidden md:flex relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar proyectos, equipos..."
            className="block w-64 pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Botón de búsqueda móvil */}
        <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Search className="h-5 w-5" />
        </button>

        {/* Notificaciones */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Bell className="h-5 w-5" />
          {/* Badge de notificaciones */}
          <span className="absolute top-1 right-1 block h-3 w-3 bg-purple-500 rounded-full">
            <span className="sr-only">Notificaciones</span>
          </span>
        </button>

        {/* Avatar del usuario */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar