// src/layouts/AdminLayout/components/panels/TasksPanel.tsx
import { CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  project?: string
}

const TasksPanel = (): React.JSX.Element => {
  // Mock data - reemplazar con datos reales
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Revisar edición del video promocional',
      priority: 'high',
      status: 'pending',
      dueDate: 'Hoy',
      project: 'Video Institucional 2025'
    },
    {
      id: '2',
      title: 'Aprobar diseños de redes sociales',
      priority: 'medium',
      status: 'in-progress',
      dueDate: 'Mañana',
      project: 'Campaña Q2'
    },
    {
      id: '3',
      title: 'Actualizar inventario de cámaras',
      priority: 'low',
      status: 'pending',
      dueDate: 'Esta semana'
    },
    {
      id: '4',
      title: 'Reunión con cliente ABC Corp',
      priority: 'high',
      status: 'completed',
      dueDate: 'Ayer',
      project: 'Proyecto ABC'
    }
  ]

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const pendingTasks = tasks.filter(task => task.status !== 'completed')
  const completedTasks = tasks.filter(task => task.status === 'completed')

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Mis Tareas</h3>
          <button className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="text-white/70">
            <span className="text-white font-medium">{pendingTasks.length}</span> pendientes
          </div>
          <div className="text-white/70">
            <span className="text-white font-medium">{completedTasks.length}</span> completadas
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Tareas pendientes */}
        {pendingTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">Pendientes</h4>
            <div className="space-y-3">
              {pendingTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-white text-sm font-medium truncate">
                          {task.title}
                        </h5>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      </div>
                      
                      {task.project && (
                        <p className="text-xs text-white/50 mb-1 truncate">
                          {task.project}
                        </p>
                      )}
                      
                      <p className="text-xs text-white/60">
                        {task.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tareas completadas */}
        {completedTasks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">Completadas</h4>
            <div className="space-y-3">
              {completedTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-white/5 rounded-lg p-3 opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(task.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-white text-sm font-medium truncate line-through">
                          {task.title}
                        </h5>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      </div>
                      
                      {task.project && (
                        <p className="text-xs text-white/50 mb-1 truncate">
                          {task.project}
                        </p>
                      )}
                      
                      <p className="text-xs text-white/60">
                        Completada {task.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white/60">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-white/40" />
              <p className="text-sm mb-2">No tienes tareas</p>
              <button className="text-purple-400 hover:text-purple-300 text-sm">
                Crear nueva tarea
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksPanel