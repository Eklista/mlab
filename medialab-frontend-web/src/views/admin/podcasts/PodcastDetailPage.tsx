// src/views/admin/podcasts/PodcastDetailPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal,
  Mic,
  Users,
  Calendar,
  PlayCircle,
  Plus,
  Eye,
  Radio,
  Volume2,
  Clock,
  Download
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Badge,
  Modal,
  StatCard
} from '@/core/components/ui'

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
  assignedTasks: {
    grabacion?: string[]
    edicion?: string[]
    audio?: string[]
    publicacion?: string[]
  }
  recordings?: {
    raw?: string
    edited?: string
    published?: string
  }
}

interface Podcast {
  id: string
  name: string
  description: string
  host: string
  category: string
  totalEpisodes: number
  publishedEpisodes: number
  status: 'planning' | 'recording' | 'active' | 'completed' | 'on-hold'
  startDate: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  platform: string[]
  averageDuration: number
  subscribers: number
  episodes: PodcastEpisode[]
}

const PodcastDetailPage = () => {
  const { podcastId } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false)

  // Mock data del podcast
  const podcast: Podcast = {
    id: podcastId || '1',
    name: 'Innovación Educativa UG',
    description: 'Conversaciones sobre metodologías innovadoras en educación superior y tecnología educativa',
    host: 'Dr. Roberto Silva',
    category: 'Educación',
    totalEpisodes: 24,
    publishedEpisodes: 18,
    status: 'active',
    startDate: '2024-09-01',
    frequency: 'weekly',
    platform: ['Spotify', 'Apple Podcasts', 'YouTube'],
    averageDuration: 45,
    subscribers: 1250,
    episodes: [
      {
        id: '1',
        number: 1,
        title: 'El Futuro de la Educación Digital',
        description: 'Exploramos las tendencias y herramientas que están transformando la educación superior',
        duration: '48:32',
        status: 'published',
        recordDate: '2024-09-01',
        publishDate: '2024-09-05',
        guest: 'Dra. Ana Martínez',
        assignedTasks: {
          grabacion: ['Carlos López'],
          edicion: ['Ana García'],
          audio: ['Roberto Méndez'],
          publicacion: ['María González']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_1',
          edited: 'https://drive.google.com/edited_1',
          published: 'https://spotify.com/episode/1'
        }
      },
      {
        id: '2',
        number: 2,
        title: 'Realidad Virtual en el Aula',
        description: 'Casos de uso prácticos de VR y AR en diferentes disciplinas académicas',
        duration: '52:15',
        status: 'editing',
        recordDate: '2024-09-08',
        guest: 'Ing. Carlos López',
        assignedTasks: {
          grabacion: ['Carlos López', 'Miguel Torres'],
          edicion: ['Ana García'],
          audio: ['Roberto Méndez']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_2',
          edited: 'https://drive.google.com/edited_2'
        }
      },
      {
        id: '3',
        number: 3,
        title: 'Inteligencia Artificial y Personalización del Aprendizaje',
        description: 'Cómo la IA está revolucionando la educación personalizada',
        duration: '45:00',
        status: 'recording',
        recordDate: '2024-09-15',
        guest: 'Dr. Juan Pérez',
        assignedTasks: {
          grabacion: ['Carlos López'],
          edicion: ['Juan Pérez']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_3'
        }
      },
      {
        id: '4',
        number: 4,
        title: 'Gamificación en la Educación Superior',
        description: 'Estrategias para implementar elementos de juego en el aprendizaje',
        duration: '50:00',
        status: 'planning',
        recordDate: '2024-09-22',
        guest: 'Lic. Sofía Hernández',
        assignedTasks: {
          grabacion: ['Miguel Torres'],
          edicion: ['Ana García']
        }
      }
    ]
  }

  const stats = [
    {
      title: 'Episodios Totales',
      value: podcast.totalEpisodes.toString(),
      subtitle: 'Planificados',
      icon: <Radio className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Episodios Publicados',
      value: podcast.publishedEpisodes.toString(),
      subtitle: 'Disponibles al público',
      icon: <PlayCircle className="w-5 h-5 text-green-400" />
    },
    {
      title: 'Suscriptores',
      value: podcast.subscribers.toLocaleString(),
      subtitle: 'En todas las plataformas',
      icon: <Users className="w-5 h-5 text-blue-400" />
    }
  ]

  const getStatusBadge = (status: PodcastEpisode['status']) => {
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
      <Badge variant={variants[status]} size="sm">
        {labels[status]}
      </Badge>
    )
  }

  const getTaskIcon = (taskType: string) => {
    const icons = {
      grabacion: <Mic className="w-4 h-4" />,
      edicion: <Edit className="w-4 h-4" />,
      audio: <Volume2 className="w-4 h-4" />,
      publicacion: <PlayCircle className="w-4 h-4" />
    }
    return icons[taskType as keyof typeof icons] || <PlayCircle className="w-4 h-4" />
  }

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      weekly: 'Semanal',
      biweekly: 'Quincenal', 
      monthly: 'Mensual'
    }
    return labels[frequency as keyof typeof labels] || frequency
  }

  const handleDeletePodcast = () => {
    setShowDeleteModal(false)
    navigate('/admin/projects/podcast')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/admin/projects/podcast')}
        >
          Volver a Podcasts
        </Button>
      </div>

      {/* Podcast Header */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-6 h-6 text-purple-400" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {podcast.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" size="sm">{podcast.category}</Badge>
                  <span className="text-zinc-400">{getFrequencyLabel(podcast.frequency)}</span>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-4">
              {podcast.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Host:</span>
                <p className="text-white font-medium">{podcast.host}</p>
              </div>
              <div>
                <span className="text-zinc-400">Frecuencia:</span>
                <p className="text-white font-medium">{getFrequencyLabel(podcast.frequency)}</p>
              </div>
              <div>
                <span className="text-zinc-400">Duración promedio:</span>
                <p className="text-white font-medium">{podcast.averageDuration} min</p>
              </div>
              <div>
                <span className="text-zinc-400">Plataformas:</span>
                <p className="text-white font-medium">{podcast.platform.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => navigate(`/admin/podcasts/${podcast.id}/edit`)}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Episodes List */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Episodios del Podcast
          </h3>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddEpisodeModal(true)}
          >
            Nuevo Episodio
          </Button>
        </div>

        <div className="space-y-4">
          {podcast.episodes.map((episode) => (
            <div key={episode.id} className="border border-zinc-700/50 rounded-lg p-4 hover:bg-zinc-800/30 transition-colors">
              {/* Episode Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-purple-400">#{episode.number}</span>
                    <h4 className="font-medium text-white">{episode.title}</h4>
                    {getStatusBadge(episode.status)}
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{episode.description}</p>
                  <div className="flex items-center gap-6 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(episode.recordDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {episode.duration}
                    </div>
                    {episode.guest && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {episode.guest}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="w-4 h-4" />}
                  onClick={() => navigate(`/admin/podcasts/${podcast.id}/episodes/${episode.id}`)}
                >
                  Ver Detalle
                </Button>
              </div>

              {/* Assigned Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(episode.assignedTasks).map(([taskType, assignees]) => (
                  assignees && assignees.length > 0 && (
                    <div key={taskType} className="bg-zinc-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {getTaskIcon(taskType)}
                        <span className="text-xs font-medium text-zinc-300 capitalize">
                          {taskType === 'grabacion' ? 'Grabación' : 
                           taskType === 'edicion' ? 'Edición' :
                           taskType === 'audio' ? 'Audio' : 'Publicación'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {assignees.map((assignee, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {assignee}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Recordings Links */}
              {episode.recordings && Object.keys(episode.recordings).length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-700/50">
                  <h5 className="text-sm font-medium text-zinc-300 mb-2">Material:</h5>
                  <div className="flex flex-wrap gap-2">
                    {episode.recordings.raw && (
                      <a 
                        href={episode.recordings.raw} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-2 py-1 rounded transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Raw Audio
                      </a>
                    )}
                    {episode.recordings.edited && (
                      <a 
                        href={episode.recordings.edited} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        Editado
                      </a>
                    )}
                    {episode.recordings.published && (
                      <a 
                        href={episode.recordings.published} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded transition-colors"
                      >
                        <Radio className="w-3 h-3" />
                        Publicado
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Opciones del Podcast"
        size="sm"
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            leftIcon={<Edit className="w-4 h-4" />}
            onClick={() => {
              setShowDeleteModal(false)
              navigate(`/admin/podcasts/${podcast.id}/edit`)
            }}
          >
            Editar Podcast
          </Button>
          <Button
            variant="danger"
            className="w-full justify-start"
            onClick={handleDeletePodcast}
          >
            Eliminar Podcast
          </Button>
        </div>
      </Modal>

      {/* Add Episode Modal */}
      <Modal
        isOpen={showAddEpisodeModal}
        onClose={() => setShowAddEpisodeModal(false)}
        title="Programar Nuevo Episodio"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            Funcionalidad para programar nuevos episodios en desarrollo...
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAddEpisodeModal(false)}
            >
              Cancelar
            </Button>
            <Button>
              Programar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PodcastDetailPage