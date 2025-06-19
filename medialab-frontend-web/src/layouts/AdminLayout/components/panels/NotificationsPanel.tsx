// src/layouts/AdminLayout/components/panels/NotificationsPanel.tsx
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  User,
} from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'user'
  title: string
  message: string
  time: string
  read: boolean
  actionable?: boolean
}

const NotificationsPanel = (): React.JSX.Element => {
  // Mock data - reemplazar con datos reales
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Proyecto completado',
      message: 'El video institucional ha sido aprobado y entregado',
      time: 'Hace 5 min',
      read: false,
      actionable: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Equipo necesita mantenimiento',
      message: 'La cámara Canon EOS R5 #001 reporta fallas',
      time: 'Hace 15 min',
      read: false,
      actionable: true
    },
    {
      id: '3',
      type: 'user',
      title: 'Nueva solicitud',
      message: 'María García ha solicitado edición de video',
      time: 'Hace 30 min',
      read: false,
      actionable: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Reunión programada',
      message: 'Reunión de proyecto a las 3:00 PM',
      time: 'Hace 1 hora',
      read: true,
      actionable: false
    },
    {
      id: '5',
      type: 'success',
      title: 'Stock actualizado',
      message: 'Se agregaron 20 baterías al inventario',
      time: 'Hace 2 horas',
      read: true,
      actionable: false
    }
  ]

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'user':
        return <User className="h-5 w-5 text-blue-500" />
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'border-l-green-500'
      case 'warning': return 'border-l-yellow-500'
      case 'error': return 'border-l-red-500'
      case 'user': return 'border-l-blue-500'
      case 'info':
      default: return 'border-l-blue-500'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="flex gap-2">
          <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Marcar todas como leídas
          </button>
          <span className="text-white/20">•</span>
          <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Ver todas
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-white/10">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-white/5 transition-colors border-l-2 ${getTypeColor(notification.type)} ${
                  !notification.read ? 'bg-white/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-medium ${
                        !notification.read ? 'text-white' : 'text-white/80'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      !notification.read ? 'text-white/80' : 'text-white/60'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">
                        {notification.time}
                      </span>
                      
                      {notification.actionable && (
                        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                          Revisar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-white/60">
              <Bell className="h-12 w-12 mx-auto mb-3 text-white/40" />
              <p className="text-sm mb-2">No hay notificaciones</p>
              <p className="text-xs text-white/40">
                Te notificaremos cuando haya actividad
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPanel