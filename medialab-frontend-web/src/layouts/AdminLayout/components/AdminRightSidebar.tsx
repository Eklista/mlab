// src/layouts/AdminLayout/components/AdminRightSidebar.tsx
import { X, ClipboardListIcon } from 'lucide-react'
import type { RightSidebarSection } from '../AdminLayout'

// Componentes para cada sección
import TasksPanel from './panels/TasksPanel'
import NotificationsPanel from './panels/NotificationsPanel'
import UsersPanel from './panels/UsersPanel'
import CalendarPanel from './panels/CalendarPanel'

interface AdminRightSidebarProps {
  activeSection?: RightSidebarSection
  onClose?: () => void
}

const AdminRightSidebar = ({ 
  activeSection = null,
  onClose
}: AdminRightSidebarProps): React.JSX.Element => {

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'tasks':
        return <TasksPanel />
      
      case 'notifications':
        return <NotificationsPanel />
      
      case 'users':
        return <UsersPanel />
      
      case 'calendar':
        return <CalendarPanel />
      
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="mb-4">
                <ClipboardListIcon className="h-12 w-12 mx-auto mb-2 text-white/40" />
              </div>
              <p className="text-sm">Selecciona una opción</p>
            </div>
          </div>
        )
    }
  }

  // Función para obtener el título de la sección
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'tasks': return 'Mis Tareas'
      case 'notifications': return 'Notificaciones'
      case 'users': return 'Usuarios Online'
      case 'calendar': return 'Mi Agenda'
      default: return 'Panel de Control'
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header - solo mostrar botón X si se proporciona onClose */}
      {onClose && (
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {getSectionTitle()}
          </h2>
          
          <button 
            className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Contenido dinámico */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  )
}

export default AdminRightSidebar