// src/views/admin/podcasts/EpisodeDetailPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  User,
  Radio,
  Plus,
  Settings,
  Edit,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Volume2,
  Mic
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

interface EpisodeTask {
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

interface PodcastEpisode {
  id: string
  number: number
  title: string
  description: string
  duration: string
  status: 'planning' | 'recording' | 'editing' | 'published'
  recordDate: string
  publishDate?: string
  guest?: string
  location: string
  podcastName: string
  podcastId: string
  host: string
  recordings?: {
    raw?: string
    edited?: string
    published?: string
  }
  tasks: EpisodeTask[]
}

const EpisodeDetailPage = () => {
  const { podcastId, episodeId } = useParams()
  const navigate = useNavigate()
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false)
  const [showTaskWorkflow, setShowTaskWorkflow] = useState(false)
  const [selectedTask, setSelectedTask] = useState<EpisodeTask | null>(null)
  const [newTask, setNewTask] = useState({
    category: '',
    subcategory: '',
    assignedTo: '',
    description: '',
    dueDate: ''
  })

  // Mock data del episodio
  const episode: PodcastEpisode = {
    id: episodeId || '1',
    number: 1,
    title: 'El Futuro de la Educación Digital',
    description: 'En este episodio exploramos las tendencias y herramientas que están transformando la educación superior, junto con expertos en el campo.',
    duration: '48:32',
    status: 'editing',
    recordDate: '2025-06-01',
    publishDate: '2025-06-10',
    guest: 'Dra. Ana Martínez',
    location: 'Estudio Podcast A',
    podcastName: 'Innovación Educativa UG',
    podcastId: podcastId || '1',
    host: 'Dr. Roberto Silva',
    recordings: {
      raw: 'https://drive.google.com/file/d/raw_audio_1',
      edited: 'https://drive.google.com/file/d/edited_audio_1'
    },
    tasks: [
      {
        id: 1,
        category: 'Grabación',
        subcategory: 'Audio principal',
        assignedTo: 'Carlos López',
        description: 'Grabación del episodio completo con host e invitado',
        dueDate: '2025-06-01',
        status: {
          level1: { status: 'completado', updatedAt: '2025-06-01 18:30', link: 'https://drive.google.com/raw_audio' },
          level2: { status: 'aprobado', updatedAt: '2025-06-02 09:15', reviewer: 'Director Producción' },
          level3: { status: 'pendiente', updatedAt: null }
        }
      },
      {
        id: 2,
        category: 'Edición',
        subcategory: 'Edición principal',
        assignedTo: 'Ana García',
        description: 'Edición completa del episodio, cortes, transiciones y ajustes',
        dueDate: '2025-06-05',
        status: {
          level1: { status: 'en-progreso', updatedAt: '2025-06-03 14:20' },
          level2: { status: 'pendiente', updatedAt: null },
          level3: { status: 'pendiente', updatedAt: null }
        }
      },
      {
        id: 3,
        category: 'Audio',
        subcategory: 'Masterización',
        assignedTo: 'Roberto Méndez',
        description: 'Masterización final del audio para distribución',
        dueDate: '2025-06-06',
        status: {
          level1: { status: 'pendiente', updatedAt: null },
          level2: { status: 'pendiente', updatedAt: null },
          level3: { status: 'pendiente', updatedAt: null }
        }
      },
      {
        id: 4,
        category: 'Publicación',
        subcategory: 'Subida a plataformas',
        assignedTo: 'María González',
        description: 'Publicación en Spotify, Apple Podcasts y YouTube',
        dueDate: '2025-06-10',
        status: {
          level1: { status: 'pendiente', updatedAt: null },
          level2: { status: 'pendiente', updatedAt: null },
          level3: { status: 'pendiente', updatedAt: null }
        }
      }
    ]
  }

  const taskCategories = [
    { value: 'grabacion', label: 'Grabación' },
    { value: 'edicion', label: 'Edición' },
    { value: 'audio', label: 'Audio' },
    { value: 'publicacion', label: 'Publicación' },
    { value: 'promocion', label: 'Promoción' },
    { value: 'transcripcion', label: 'Transcripción' }
  ]

  const teamMembers = [
    { value: 'ana', label: 'Ana García' },
    { value: 'carlos', label: 'Carlos López' },
    { value: 'maria', label: 'María González' },
    { value: 'juan', label: 'Juan Pérez' },
    { value: 'roberto', label: 'Roberto Méndez' },
    { value: 'sofia', label: 'Sofía Hernández' }
  ]

  const getEpisodeStatusBadge = (status: PodcastEpisode['status']) => {
    const variants = {
      planning: 'info',
      recording: 'warning',
      editing: 'secondary',
      published: 'success'
    } as const

    const labels = {
      planning: 'Planificación',
      recording: 'Grabando',
      editing: 'Editando',
      published: 'Publicado'
    }

    return (
      <Badge variant={variants[status]} size="lg">
        {labels[status]}
      </Badge>
    )
  }

  const getTaskStatusIndicator = (task: EpisodeTask) => {
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
    console.log('Nueva tarea para episodio:', newTask)
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
          onClick={() => navigate(`/admin/podcasts/${episode.podcastId}`)}
        >
          Volver al Podcast
        </Button>
      </div>

      {/* Episode Header */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-6 h-6 text-purple-400" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Episodio #{episode.number}: {episode.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" size="sm">{episode.podcastName}</Badge>
                  <span className="text-zinc-400">• {episode.duration}</span>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-4">
              {episode.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {getEpisodeStatusBadge(episode.status)}
              <div className="flex items-center gap-2 text-zinc-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Host: {episode.host}</span>
              </div>
              {episode.guest && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Invitado: {episode.guest}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Fecha de grabación:</span>
                <p className="text-white font-medium">
                  {new Date(episode.recordDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-zinc-400">Fecha de publicación:</span>
                <p className="text-white font-medium">
                  {episode.publishDate ? new Date(episode.publishDate).toLocaleDateString() : 'Por definir'}
                </p>
              </div>
              <div>
                <span className="text-zinc-400">Duración:</span>
                <p className="text-white font-medium">{episode.duration}</p>
              </div>
              <div>
                <span className="text-zinc-400">Ubicación:</span>
                <p className="text-white font-medium">{episode.location}</p>
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
      {episode.recordings && Object.keys(episode.recordings).length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Material del Episodio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {episode.recordings.raw && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Audio Original</h4>
                <a 
                  href={episode.recordings.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <Mic className="w-4 h-4" />
                  Descargar archivo
                </a>
              </div>
            )}
            {episode.recordings.edited && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Audio Editado</h4>
                <a 
                  href={episode.recordings.edited}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  Descargar archivo
                </a>
              </div>
            )}
            {episode.recordings.published && (
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Publicado</h4>
                <a 
                  href={episode.recordings.published}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
                >
                  <Radio className="w-4 h-4" />
                  Escuchar episodio
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
            Tareas del Episodio
          </h3>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAssignTaskModal(true)}
          >
            Asignar Tarea
          </Button>
        </div>

        <div className="space-y-3">
          {episode.tasks.map((task) => (
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

          {episode.tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-zinc-400">No hay tareas asignadas para este episodio</p>
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

      {/* Episode Progress Timeline */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline del Episodio
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-green-300">Grabación Completada</h4>
              <p className="text-sm text-green-200">
                {new Date(episode.recordDate).toLocaleDateString()} - Audio grabado exitosamente
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-300">En Edición</h4>
              <p className="text-sm text-yellow-200">
                Proceso de edición en progreso
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-zinc-700/30 rounded-lg border border-zinc-600/20">
            <div className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-zinc-300">Programado para Publicación</h4>
              <p className="text-sm text-zinc-400">
                {episode.publishDate ? new Date(episode.publishDate).toLocaleDateString() : 'Fecha por confirmar'}
              </p>
            </div>
          </div>
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
        title="Asignar Tarea al Episodio"
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
            placeholder="Ej: Audio principal, Intro, Outro, Masterización..."
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

export default EpisodeDetailPage