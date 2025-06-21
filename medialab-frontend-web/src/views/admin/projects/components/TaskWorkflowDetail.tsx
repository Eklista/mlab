// src/views/admin/projects/components/TaskWorkflowDetail.tsx
import { useState } from 'react'
import { 
  User, 
  Users, 
  CheckCircle,
  FileText, 
  Upload,
  Send,
  MessageSquare,
  Calendar
} from 'lucide-react'
import { Button, Badge, Input, Textarea } from '@/core/components/ui'

interface TaskStatus {
  level1: { 
    status: string
    updatedAt: string | null
    file?: string
    link?: string
  }
  level2: { 
    status: string
    updatedAt: string | null
    reviewer?: string
    observations?: string
  }
  level3: { 
    status: string
    updatedAt: string | null
    reviewer?: string
    observations?: string
  }
}

interface Task {
  id: number
  category: string
  subcategory: string
  assignedTo: string
  description: string
  dueDate: string
  status: TaskStatus
}

interface TaskWorkflowDetailProps {
  task: Task
  onClose: () => void
}

const TaskWorkflowDetail = ({ task }: TaskWorkflowDetailProps) => {
  const [fileLink, setFileLink] = useState('')
  const [comment, setComment] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)

  const getTaskStatusBadge = (status: string, level: number) => {
    const level1Config = {
      'pendiente': { variant: 'secondary' as const, label: 'Pendiente', icon: '⏳' },
      'en-progreso': { variant: 'warning' as const, label: 'En Progreso', icon: '🔄' },
      'completado': { variant: 'success' as const, label: 'Completado', icon: '✅' },
      'cancelado': { variant: 'danger' as const, label: 'Cancelado', icon: '❌' }
    }

    const level2Config = {
      'pendiente': { variant: 'secondary' as const, label: 'Pendiente Revisión', icon: '⏳' },
      'aprobado': { variant: 'success' as const, label: 'Aprobado Interno', icon: '✅' },
      'rechazado': { variant: 'danger' as const, label: 'Rechazado', icon: '❌' }
    }

    const level3Config = {
      'pendiente': { variant: 'secondary' as const, label: 'Pendiente Cliente', icon: '⏳' },
      'en-revision': { variant: 'warning' as const, label: 'En Revisión Cliente', icon: '👁️' },
      'aprobado': { variant: 'success' as const, label: 'Aprobado Final', icon: '🎉' },
      'rechazado': { variant: 'danger' as const, label: 'Rechazado Cliente', icon: '❌' }
    }

    let statusConfig;
    
    if (level === 1) {
      statusConfig = level1Config[status as keyof typeof level1Config]
    } else if (level === 2) {
      statusConfig = level2Config[status as keyof typeof level2Config]
    } else if (level === 3) {
      statusConfig = level3Config[status as keyof typeof level3Config]
    }
    
    if (!statusConfig) return null

    return (
      <Badge variant={statusConfig.variant} size="sm">
        {statusConfig.icon} {statusConfig.label}
      </Badge>
    )
  }

  const handleSubmitWork = () => {
    if (!fileLink.trim()) return
    
    console.log('Subiendo trabajo:', {
      taskId: task.id,
      fileLink,
      comment
    })
    
    setFileLink('')
    setComment('')
    setShowUploadForm(false)
    // Aquí iría la lógica para actualizar el estado de la tarea
  }

  const canUpload = task.status.level1.status === 'pendiente' || task.status.level1.status === 'en-progreso'

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div className="bg-zinc-800/30 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-2">
          {task.category} - {task.subcategory}
        </h3>
        <p className="text-zinc-300 mb-3">{task.description}</p>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Asignado a: {task.assignedTo}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Upload Section - Solo visible si puede subir */}
      {canUpload && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-300 font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir Trabajo
            </h4>
            {!showUploadForm && (
              <Button 
                size="sm" 
                onClick={() => setShowUploadForm(true)}
                leftIcon={<FileText className="w-4 h-4" />}
              >
                Entregar Trabajo
              </Button>
            )}
          </div>
          
          {showUploadForm && (
            <div className="space-y-3">
              <Input
                label="Link del archivo"
                value={fileLink}
                onChange={(e) => setFileLink(e.target.value)}
                placeholder="https://drive.google.com/... o link de tu preferencia"
              />
              <Textarea
                label="Comentarios (opcional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe tu trabajo o agrega notas..."
                rows={3}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitWork}
                  disabled={!fileLink.trim()}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Entregar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Workflow Status */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Estado del Workflow</h4>
        
        {/* Nivel 1: Encargado */}
        <div className="bg-zinc-800/30 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              <h5 className="font-medium text-white">Nivel 1: Encargado</h5>
            </div>
            {getTaskStatusBadge(task.status.level1.status, 1)}
          </div>
          
          <div className="space-y-2 text-sm">
            {task.status.level1.updatedAt && (
              <p className="text-zinc-400">
                Última actualización: {new Date(task.status.level1.updatedAt).toLocaleString()}
              </p>
            )}
            {task.status.level1.file && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                <a 
                  href={task.status.level1.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {task.status.level1.file}
                </a>
              </div>
            )}
            {task.status.level1.link && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                <a 
                  href={task.status.level1.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Ver archivo entregado
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Nivel 2: Aprobación Interna */}
        <div className="bg-zinc-800/30 rounded-lg p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <h5 className="font-medium text-white">Nivel 2: Aprobación Interna</h5>
            </div>
            {getTaskStatusBadge(task.status.level2.status, 2)}
          </div>
          
          <div className="space-y-2 text-sm">
            {task.status.level2.updatedAt && (
              <p className="text-zinc-400">
                Revisado: {new Date(task.status.level2.updatedAt).toLocaleString()}
              </p>
            )}
            {task.status.level2.reviewer && (
              <p className="text-zinc-400">
                Revisor: {task.status.level2.reviewer}
              </p>
            )}
            {task.status.level2.observations && (
              <div className="bg-red-500/10 border border-red-500/20 rounded p-3 mt-2">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-300 font-medium text-xs mb-1">Observaciones:</p>
                    <p className="text-red-200 text-sm">{task.status.level2.observations}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nivel 3: Cliente */}
        <div className="bg-zinc-800/30 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <h5 className="font-medium text-white">Nivel 3: Cliente</h5>
            </div>
            {getTaskStatusBadge(task.status.level3.status, 3)}
          </div>
          
          <div className="space-y-2 text-sm">
            {task.status.level3.updatedAt && (
              <p className="text-zinc-400">
                Revisado: {new Date(task.status.level3.updatedAt).toLocaleString()}
              </p>
            )}
            {task.status.level3.reviewer && (
              <p className="text-zinc-400">
                Cliente: {task.status.level3.reviewer}
              </p>
            )}
            {task.status.level3.observations && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mt-2">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 font-medium text-xs mb-1">Feedback del Cliente:</p>
                    <p className="text-yellow-200 text-sm">{task.status.level3.observations}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workflow Legend */}
      <div className="bg-zinc-800/20 rounded-lg p-4 border border-zinc-700/30">
        <h5 className="text-white font-medium mb-3">Flujo de Trabajo:</h5>
        <div className="space-y-2 text-xs text-zinc-400">
          <p><strong className="text-blue-400">Nivel 1:</strong> El encargado sube su trabajo con un link</p>
          <p><strong className="text-orange-400">Nivel 2:</strong> Supervisor interno revisa y aprueba/rechaza</p>
          <p><strong className="text-green-400">Nivel 3:</strong> Cliente final da feedback y aprobación</p>
        </div>
      </div>
    </div>
  )
}

export default TaskWorkflowDetail