// src/views/admin/courses/ClassDetailPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  User,
  PlayCircle,
  Plus,
  Video,
  Settings,
  Edit,
  Link as LinkIcon,
  CheckCircle,
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
import TaskWorkflowDetail from '../projects/components/TaskWorkflowDetail'

interface ClassTask {
  id: number
  category: string
  subcategory: string
  assignedTo: string
  description: string
  dueDate: string
  status: {
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
}

interface CourseClass {
  id: string
  number: number
  title: string
  description: string
  duration: number
  date: string
  time: string
  status: 'pending' | 'recorded' | 'edited' | 'published'
  location: string
  courseName: string
  courseCode: string
  professor: string
  recordings?: {
    raw?: string
    edited?: string
    published?: string
  }
  tasks: ClassTask[]
}

const ClassDetailPage = () => {
  const { courseId, classId } = useParams()
  const navigate = useNavigate()
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false)
  const [showTaskWorkflow, setShowTaskWorkflow] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ClassTask | null>(null)
  const [newTask, setNewTask] = useState({
    category: '',
    subcategory: '',
    assignedTo: '',
    description: '',
    dueDate: ''
  })

  // Mock data de la clase
  const classData: CourseClass = {
    id: classId || '1',
    number: 1,
    title: 'Introducción a la Programación',
    description: 'Conceptos básicos de programación, historia y paradigmas. En esta clase cubriremos los fundamentos que todo programador debe conocer.',
    duration: 120,
    date: '2025-01-15',
    time: '14:00',
    status: 'recorded',
    location: 'Laboratorio A-201',
    courseName: 'Fundamentos de Programación',
    courseCode: 'INGS-101',
    professor: 'Dr. Roberto Silva',
    recordings: {
      raw: 'https://drive.google.com/file/d/raw_video_1',
      edited: 'https://drive.google.com/file/d/edited_video_1'
    },
    tasks: [
      {
        id: 1,
        category: 'Camarografía',
        subcategory: 'Grabación principal',
        assignedTo: 'Carlos López',
        description: 'Grabación de la clase con 2 cámaras, enfoque en profesor y pizarra',
        dueDate: '2025-01-15',
        status: {
          level1: { status: 'completado', updatedAt: '2025-01-15 16:30', link: 'https://drive.google.com/raw_footage' },
          level2: { status: 'aprobado', updatedAt: '2025-01-16 09:15', reviewer: 'Director Producción' },
          level3: { status: 'pendiente', updatedAt: null }
        }
      },
      {
        id: 2,
        category: 'Edición',
        subcategory: 'Edición básica',
        assignedTo: 'Ana García',
        description: 'Edición de video, cortes, transiciones y ajuste de audio',
        dueDate: '2025-01-18',
        status: {
          level1: { status: 'en-progreso', updatedAt: '2025-01-17 10:00' },
          level2: { status: 'pendiente', updatedAt: null },
          level3: { status: 'pendiente', updatedAt: null }
        }
      },
      {
        id: 3,
        category: 'Audio',
        subcategory: 'Mezcla de audio',
        assignedTo: 'Roberto Méndez',
        description: 'Limpieza de audio, reducción de ruido y masterización',
        dueDate: '2025-01-17',
        status: {
          level1: { status: 'completado', updatedAt: '2025-01-17 14:20', link: 'https://drive.google.com/audio_final' },
          level2: { status: 'aprobado', updatedAt: '2025-01-17 16:45', reviewer: 'Director Producción' },
          level3: { status: 'aprobado', updatedAt: '2025-01-18 10:30', reviewer: 'Profesor' }
        }
      }
    ]
  }

  const taskCategories = [
    { value: 'camarografia', label: 'Camarografía' },
    { value: 'edicion', label: 'Edición' },
    { value: 'audio', label: 'Audio' },
    { value: 'streaming', label: 'Streaming' },
    { value: 'apoyo_tecnico', label: 'Apoyo Técnico' }
  ]

  const teamMembers = [
    { value: 'ana', label: 'Ana García' },
    { value: 'carlos', label: 'Carlos López' },
    { value: 'maria', label: 'María González' },
    { value: 'juan', label: 'Juan Pérez' },
    { value: 'roberto', label: 'Roberto Méndez' },
    { value: 'sofia', label: 'Sofía Hernández' }
  ]

  const getClassStatusBadge = (status: CourseClass['status']) => {
    const variants = {
      pending: 'secondary',
      recorded: 'warning',
      edited: 'info',
      published: 'success'
    } as const

    const labels = {
      pending: 'Pendiente',
      recorded: 'Grabada',
      edited: 'Editada',
      published: 'Publicada'
    }

    return (
      <Badge variant={variants[status]} size="lg">
        {labels[status]}
      </Badge>
    )
  }

  const getTaskStatusIndicator = (task: ClassTask) => {
    if (task.status.level3.status === 'aprobado') {
      return <div className="w-3 h-3 bg-green-400 rounded-full" title="Completado" />
    } else if (task.status.level2.status === 'aprobado') {
      return <div className="w-3 h-3 bg-blue-400 rounded-full" title="Aprobado internamente" />
    } else if (task.status.level1.status === 'completado') {
      return <div className="w-3 h-3 bg-yellow-400 rounded-full" title="Esperando revisión" />
    } else if (task.status.level1.status === 'en-progreso') {
      return <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" title="En progreso" />
    } else {
      return <div className="w-3 h-3 bg-gray-400 rounded-full" title="Pendiente" />
    }
  }

  const handleAssignTask = () => {
    console.log('Nueva tarea para clase:', newTask)
    setShowAssignTaskModal(false)
    setNewTask({
      category: '',
      subcategory: '',
      assignedTo: '',
      description: '',
      dueDate: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate(`/admin/courses/${courseId}`)}
        >
          Volver al Curso
        </Button>
      </div>

      {/* Class Header */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <PlayCircle className="w-6 h-6 text-blue-400" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Clase #{classData.number}: {classData.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" size="sm">{classData.courseCode}</Badge>
                  <span className="text-zinc-400">{classData.courseName}</span>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-4">
              {classData.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {getClassStatusBadge(classData.status)}
              <div className="flex items-center gap-2 text-zinc-400">
                <User className="w-4 h-4" />
                <span className="text-sm">{classData.professor}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Fecha:</span>
                <p className="text-white font-medium">
                  {new Date(classData.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-zinc-400">Hora:</span>
                <p className="text-white font-medium">{classData.time}</p>
              </div>
              <div>
                <span className="text-zinc-400">Duración:</span>
                <p className="text-white font-medium">{classData.duration} min</p>
              </div>
              <div>
                <span className="text-zinc-400">Ubicación:</span>
                <p className="text-white font-medium">{classData.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<Edit className="w-4 h-4" />}
            >
              Editar
            </Button>
          </div>
        </div>
      </Card>

      {/* Recordings Section */}
      {classData.recordings && Object.keys(classData.recordings).length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Video className="w-5 h-5" />
            Material de la Clase
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classData.recordings.raw && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Grabación Original</h4>
                <a 
                  href={classData.recordings.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Ver archivo
                </a>
              </div>
            )}
            {classData.recordings.edited && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Video Editado</h4>
                <a 
                  href={classData.recordings.edited}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Ver archivo
                </a>
              </div>
            )}
            {classData.recordings.published && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Publicado</h4>
                <a 
                  href={classData.recordings.published}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Ver en plataforma
                </a>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Tasks Section */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Tareas de la Clase
          </h3>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAssignTaskModal(true)}
          >
            Asignar Tarea
          </Button>
        </div>

        <div className="space-y-3">
          {classData.tasks.map((task) => (
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
                {getTaskStatusIndicator(task)}
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Settings className="w-4 h-4" />}
                  onClick={() => {
                    setSelectedTask(task)
                    setShowTaskWorkflow(true)
                  }}
                >
                  Ver Workflow
                </Button>
              </div>
            </div>
          ))}

          {classData.tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-zinc-400">No hay tareas asignadas para esta clase</p>
              <Button
                className="mt-4"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setShowAssignTaskModal(true)}
              >
                Asignar Primera Tarea
              </Button>
            </div>
          )}
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
        title="Asignar Tarea a la Clase"
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
            placeholder="Ej: Grabación principal, Edición básica..."
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
    </div>
  )
}

export default ClassDetailPage