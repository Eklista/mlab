// src/views/admin/projects/ProjectDetailsPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal,
  Calendar,
  User,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  PlayCircle,
  Camera,
  Mic,
  GraduationCap,
  Plus,
  Eye
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Badge,
  Modal,
  Select,
  Input,
  Textarea
} from '@/core/components/ui'
import SlideIn from '@/core/components/ui/SlideIn'
import TaskWorkflowDetail from './components/TaskWorkflowDetail'

// Componentes específicos por tipo - usando imports dinámicos como fallback
const PodcastSpecificSections = ({ project }: { project: any }) => (
  <div className="text-zinc-400 p-8 text-center">
    Secciones específicas de Podcast en desarrollo...
    <p className="text-sm mt-2">Proyecto: {project.title}</p>
  </div>
)

const CourseSpecificSections = ({ project }: { project: any }) => (
  <div className="text-zinc-400 p-8 text-center">
    Secciones específicas de Curso en desarrollo...
    <p className="text-sm mt-2">Proyecto: {project.title}</p>
  </div>
)

const GeneralSpecificSections = ({ project }: { project: any }) => (
  <div className="text-zinc-400 p-8 text-center">
    Secciones específicas de Proyecto General en desarrollo...
    <p className="text-sm mt-2">Proyecto: {project.title}</p>
  </div>
)

interface Project {
  id: string
  title: string
  description: string
  type: 'general' | 'podcast' | 'course' | 'video'
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  client: string
  assignedTo: string[]
  startDate: string
  endDate: string
  progress: number
  category: string
  createdAt: string
  updatedAt: string
  // Campos específicos por tipo
  episodes?: number // podcast
  duration?: string // podcast/course
  platform?: string // course
  resolution?: string // video
  equipment?: string[] // general
}

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false)
  const [showTaskWorkflow, setShowTaskWorkflow] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [newTask, setNewTask] = useState({
    category: '',
    subcategory: '',
    assignedTo: '',
    description: '',
    dueDate: ''
  })

  // Mock data del proyecto
  const project: Project = {
    id: projectId || '1',
    title: 'Video Promocional Facultad de Medicina',
    description: 'Producción de video promocional para la nueva maestría en Medicina Interna. Este proyecto incluye pre-producción, grabación en locaciones de la facultad, entrevistas con profesores y estudiantes, y post-producción completa.',
    type: 'general',
    status: 'in-progress',
    priority: 'high',
    client: 'Facultad de Medicina',
    assignedTo: ['Ana García', 'Carlos López'],
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    progress: 65,
    category: 'Video',
    createdAt: '2025-05-28',
    updatedAt: '2025-06-18',
    equipment: ['Canon EOS R5', 'Micrófono Rode', 'Luces LED']
  }

  // Mock data de tareas con workflow de 3 niveles
  const tasks = [
    {
      id: 1,
      category: 'Edición',
      subcategory: 'Edición principal',
      assignedTo: 'Ana García',
      description: 'Edición completa del video promocional',
      dueDate: '2025-06-25',
      status: {
        level1: { status: 'completado', updatedAt: '2025-06-20 14:30', file: 'video_v1.mp4' },
        level2: { status: 'aprobado', updatedAt: '2025-06-21 09:15', reviewer: 'Director Producción' },
        level3: { status: 'en-revision', updatedAt: '2025-06-21 16:30', reviewer: 'Cliente' }
      }
    },
    {
      id: 2,
      category: 'Animaciones',
      subcategory: 'Intro',
      assignedTo: 'María González',
      description: 'Animación de introducción del video',
      dueDate: '2025-06-22',
      status: {
        level1: { status: 'en-progreso', updatedAt: '2025-06-18 10:00' },
        level2: { status: 'pendiente', updatedAt: null },
        level3: { status: 'pendiente', updatedAt: null }
      }
    },
    {
      id: 3,
      category: 'Animaciones',
      subcategory: 'Cintillos',
      assignedTo: 'Juan Pérez',
      description: 'Cintillos informativos y títulos',
      dueDate: '2025-06-23',
      status: {
        level1: { status: 'completado', updatedAt: '2025-06-19 16:45', file: 'cintillos_v1.ae' },
        level2: { status: 'rechazado', updatedAt: '2025-06-20 11:20', reviewer: 'Director Producción', observations: 'Ajustar colores según brand guidelines' },
        level3: { status: 'pendiente', updatedAt: null }
      }
    },
    {
      id: 4,
      category: 'Audio',
      subcategory: 'Mezcla final',
      assignedTo: 'Roberto Méndez',
      description: 'Mezcla de audio y masterización',
      dueDate: '2025-06-24',
      status: {
        level1: { status: 'pendiente', updatedAt: null },
        level2: { status: 'pendiente', updatedAt: null },
        level3: { status: 'pendiente', updatedAt: null }
      }
    }
  ]

  const taskCategories = [
    { value: 'camarografia', label: 'Camarografía' },
    { value: 'edicion', label: 'Edición' },
    { value: 'audio', label: 'Audio' },
    { value: 'animaciones', label: 'Animaciones' },
    { value: 'transmision', label: 'Transmisión' },
    { value: 'diseno', label: 'Diseño Gráfico' }
  ]

  const teamMembers = [
    { value: 'ana', label: 'Ana García' },
    { value: 'carlos', label: 'Carlos López' },
    { value: 'maria', label: 'María González' },
    { value: 'juan', label: 'Juan Pérez' },
    { value: 'roberto', label: 'Roberto Méndez' },
    { value: 'sofia', label: 'Sofía Hernández' }
  ]

  const activities = [
    {
      id: 1,
      type: 'status_change',
      message: 'Estado cambiado a "En Progreso"',
      user: 'Ana García',
      timestamp: '2025-06-18 14:30',
      icon: <CheckCircle className="w-4 h-4 text-green-400" />
    },
    {
      id: 2,
      type: 'comment',
      message: 'Se completó la fase de pre-producción. Listos para comenzar grabación.',
      user: 'Carlos López',
      timestamp: '2025-06-17 09:15',
      icon: <MessageSquare className="w-4 h-4 text-blue-400" />
    },
    {
      id: 3,
      type: 'file_upload',
      message: 'Subió 3 archivos: script_final.pdf, storyboard.jpg, cronograma.xlsx',
      user: 'Ana García',
      timestamp: '2025-06-15 16:45',
      icon: <FileText className="w-4 h-4 text-purple-400" />
    },
    {
      id: 4,
      type: 'assignment',
      message: 'Proyecto asignado a Carlos López',
      user: 'Ana García',
      timestamp: '2025-06-01 10:00',
      icon: <User className="w-4 h-4 text-orange-400" />
    }
  ]

  const getStatusBadge = (status: Project['status']) => {
    const variants = {
      planning: 'info',
      'in-progress': 'warning',
      review: 'secondary',
      completed: 'success'
    } as const

    const labels = {
      planning: 'Planificación',
      'in-progress': 'En Progreso',
      review: 'En Revisión',
      completed: 'Completado'
    }

    return (
      <Badge variant={variants[status]} size="lg">
        {labels[status]}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Project['priority']) => {
    const variants = {
      low: 'secondary',
      medium: 'warning',
      high: 'danger'
    } as const

    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    }

    return (
      <Badge variant={variants[priority]}>
        {labels[priority]}
      </Badge>
    )
  }

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

  const getTypeIcon = (type: Project['type']) => {
    const icons = {
      general: <PlayCircle className="w-5 h-5" />,
      podcast: <Mic className="w-5 h-5" />,
      course: <GraduationCap className="w-5 h-5" />,
      video: <Camera className="w-5 h-5" />
    }
    return icons[type] || <PlayCircle className="w-5 h-5" />
  }

  const getTypeLabel = (type: Project['type']) => {
    const labels = {
      general: 'Proyecto General',
      podcast: 'Podcast',
      course: 'Curso',
      video: 'Video'
    }
    return labels[type] || 'Proyecto General'
  }

  const renderTypeSpecificSections = () => {
    switch(project.type) {
      case 'podcast':
        return <PodcastSpecificSections project={project} />
      case 'course':
        return <CourseSpecificSections project={project} />
      default:
        return <GeneralSpecificSections project={project} />
    }
  }

  const handleAssignTask = () => {
    console.log('Nueva tarea:', newTask)
    setShowAssignTaskModal(false)
    setNewTask({
      category: '',
      subcategory: '',
      assignedTo: '',
      description: '',
      dueDate: ''
    })
  }

  const handleDeleteProject = () => {
    setShowDeleteModal(false)
    navigate('/admin/projects/general')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/admin/projects/general')}
        >
          Volver a Proyectos
        </Button>
      </div>

      {/* Project Header */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {getTypeIcon(project.type)}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {project.title}
                </h1>
                <p className="text-zinc-400 mt-1">
                  {getTypeLabel(project.type)} • {project.category}
                </p>
              </div>
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              {getStatusBadge(project.status)}
              {getPriorityBadge(project.priority)}
              <div className="flex items-center gap-2 text-zinc-400">
                <User className="w-4 h-4" />
                <span className="text-sm">{project.client}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<MoreHorizontal className="w-4 h-4" />}
              onClick={() => setShowDeleteModal(true)}
            >
              Opciones
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Progreso del Proyecto
            </h3>
            <span className="text-2xl font-bold text-white">{project.progress}%</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
              <span>Progreso General</span>
              <span>{project.progress}% completado</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-stone-50 to-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">Fecha de Inicio</span>
              </div>
              <p className="text-white font-medium">
                {new Date(project.startDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">Fecha de Entrega</span>
              </div>
              <p className="text-white font-medium">
                {new Date(project.endDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Equipo Asignado
          </h3>
          <div className="space-y-3">
            {project.assignedTo.map((person, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-zinc-900">
                    {person.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-zinc-300">{person}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tasks Card - Simplified */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Tareas del Proyecto
          </h3>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAssignTaskModal(true)}
          >
            Asignar Tarea
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-white">
                  {task.category} - {task.subcategory}
                </h4>
                <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                  <span>Asignado a: {task.assignedTo}</span>
                  <span>Fecha límite: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Status indicator */}
                <div className="flex items-center gap-1">
                  {task.status.level1.status === 'completado' && (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  {task.status.level1.status === 'en-progreso' && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  )}
                  {task.status.level1.status === 'pendiente' && (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="w-4 h-4" />}
                  onClick={() => {
                    setSelectedTask(task)
                    setShowTaskWorkflow(true)
                  }}
                >
                  Ver
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Type-specific sections */}
      {renderTypeSpecificSections()}

      {/* Activity Timeline */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Actividad Reciente
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-zinc-800/30 rounded-lg transition-colors">
              <div className="mt-1">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-zinc-300 text-sm">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-500">{activity.user}</span>
                  <span className="text-xs text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Task Workflow SlideIn */}
      <SlideIn
        isOpen={showTaskWorkflow}
        onClose={() => {
          setShowTaskWorkflow(false)
          setSelectedTask(null)
        }}
        title={selectedTask ? `${selectedTask.category} - ${selectedTask.subcategory}` : 'Workflow de Tarea'}
        size="xl"
      >
        {selectedTask && (
          <TaskWorkflowDetail 
            task={selectedTask} 
            onClose={() => {
              setShowTaskWorkflow(false)
              setSelectedTask(null)
            }}
          />
        )}
      </SlideIn>

      {/* Assign Task Modal */}
      <Modal
        isOpen={showAssignTaskModal}
        onClose={() => setShowAssignTaskModal(false)}
        title="Asignar Nueva Tarea"
        size="md"
      >
        <div className="space-y-4">
          <Select
            label="Categoría"
            value={newTask.category}
            onChange={(value) => setNewTask(prev => ({ ...prev, category: value.toString() }))}
            options={taskCategories}
            placeholder="Selecciona una categoría"
          />
          
          <Input
            label="Subcategoría"
            value={newTask.subcategory}
            onChange={(e) => setNewTask(prev => ({ ...prev, subcategory: e.target.value }))}
            placeholder="Ej: Intro, Cintillos, Edición principal..."
          />
          
          <Select
            label="Asignar a"
            value={newTask.assignedTo}
            onChange={(value) => setNewTask(prev => ({ ...prev, assignedTo: value.toString() }))}
            options={teamMembers}
            placeholder="Selecciona un miembro del equipo"
          />
          
          <Textarea
            label="Descripción"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe los detalles de la tarea..."
            rows={3}
          />
          
          <Input
            label="Fecha límite"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAssignTaskModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAssignTask}
              disabled={!newTask.category || !newTask.assignedTo || !newTask.description}
            >
              Asignar Tarea
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Opciones del Proyecto"
        size="sm"
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            leftIcon={<Edit className="w-4 h-4" />}
            onClick={() => {
              setShowDeleteModal(false)
              navigate(`/admin/projects/${project.id}/edit`)
            }}
          >
            Editar Proyecto
          </Button>
          <Button
            variant="danger"
            className="w-full justify-start"
            onClick={handleDeleteProject}
          >
            Eliminar Proyecto
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectDetailsPage