// src/layouts/AdminLayout/components/panels/UsersPanel.tsx
import { Users, Circle } from 'lucide-react'
import UserAvatar from '../UserAvatar'

interface OnlineUser {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role: 'admin' | 'client' | 'staff'
  status: 'online' | 'away' | 'busy'
  lastActivity: string
  currentActivity?: string
}

const UsersPanel = (): React.JSX.Element => {
  // Mock data - reemplazar con datos reales
  const onlineUsers: OnlineUser[] = [
    {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@galileo.edu',
      role: 'admin',
      status: 'online',
      lastActivity: 'Activo ahora',
      currentActivity: 'Editando proyecto ABC'
    },
    {
      id: '2',
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@galileo.edu',
      role: 'staff',
      status: 'away',
      lastActivity: 'Hace 5 min'
    },
    {
      id: '3',
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@cliente.com',
      role: 'client',
      status: 'online',
      lastActivity: 'Activo ahora',
      currentActivity: 'Revisando solicitud'
    },
    {
      id: '4',
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@galileo.edu',
      role: 'staff',
      status: 'busy',
      lastActivity: 'Activo ahora',
      currentActivity: 'En reunión'
    }
  ]

  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'away': return 'text-yellow-500'
      case 'busy': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusText = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online': return 'En línea'
      case 'away': return 'Ausente'
      case 'busy': return 'Ocupado'
      default: return 'Desconectado'
    }
  }

  const getRoleText = (role: OnlineUser['role']) => {
    switch (role) {
      case 'admin': return 'Administrador'
      case 'staff': return 'Personal'
      case 'client': return 'Cliente'
      default: return 'Usuario'
    }
  }

  const getRoleColor = (role: OnlineUser['role']) => {
    switch (role) {
      case 'admin': return 'text-purple-400'
      case 'staff': return 'text-blue-400'
      case 'client': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const onlineCount = onlineUsers.filter(u => u.status === 'online').length
  const totalUsers = onlineUsers.length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Usuarios Online</h3>
          <div className="flex items-center gap-1">
            <Circle className="h-2 w-2 text-green-500 fill-current" />
            <span className="text-sm text-white/70">{onlineCount}</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="text-sm text-white/60">
          <span className="text-white font-medium">{onlineCount}</span> de{' '}
          <span className="text-white font-medium">{totalUsers}</span> usuarios conectados
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {onlineUsers.length > 0 ? (
          <div className="p-4 space-y-3">
            {onlineUsers.map(user => (
              <div 
                key={user.id}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <UserAvatar 
                      user={user}
                      size="md"
                    />
                    {/* Status indicator */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-900 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white text-sm font-medium truncate">
                        {user.firstName} {user.lastName}
                      </h4>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleColor(user.role)} bg-white/10`}>
                        {getRoleText(user.role)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <Circle className={`h-2 w-2 ${getStatusColor(user.status)} fill-current`} />
                      <span className="text-xs text-white/60">
                        {getStatusText(user.status)}
                      </span>
                      <span className="text-xs text-white/40">
                        • {user.lastActivity}
                      </span>
                    </div>
                    
                    {user.currentActivity && (
                      <p className="text-xs text-white/50 truncate">
                        {user.currentActivity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-white/60">
              <Users className="h-12 w-12 mx-auto mb-3 text-white/40" />
              <p className="text-sm mb-2">No hay usuarios en línea</p>
              <p className="text-xs text-white/40">
                Los usuarios aparecerán aquí cuando se conecten
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer con acciones rápidas */}
      <div className="p-4 border-t border-white/10">
        <div className="space-y-2">
          <button className="w-full text-left text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Ver todos los usuarios
          </button>
          <button className="w-full text-left text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Gestionar permisos
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersPanel