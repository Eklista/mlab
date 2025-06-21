// src/views/admin/podcasts/PodcastsPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  Radio,
  Users,
  Eye,
  Edit,
  Trash2,
  PlayCircle
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  Badge,
  StatCard,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/core/components/ui'

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
}

const PodcastsPage = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null)

  // Mock data - Podcasts
  const podcasts: Podcast[] = [
    {
      id: '1',
      name: 'Innovación Educativa UG',
      description: 'Conversaciones sobre metodologías innovadoras en educación superior',
      host: 'Dr. Roberto Silva',
      category: 'Educación',
      totalEpisodes: 24,
      publishedEpisodes: 18,
      status: 'active',
      startDate: '2024-09-01',
      frequency: 'weekly',
      platform: ['Spotify', 'Apple Podcasts', 'YouTube'],
      averageDuration: 45,
      subscribers: 1250
    },
    {
      id: '2',
      name: 'Medicina al Día',
      description: 'Avances médicos y casos clínicos explicados para estudiantes',
      host: 'Dra. Ana Martínez',
      category: 'Medicina',
      totalEpisodes: 16,
      publishedEpisodes: 12,
      status: 'active',
      startDate: '2024-10-15',
      frequency: 'biweekly',
      platform: ['Spotify', 'Apple Podcasts'],
      averageDuration: 35,
      subscribers: 890
    },
    {
      id: '3',
      name: 'TechTalks Galileo',
      description: 'Entrevistas con profesionales de tecnología y estudiantes destacados',
      host: 'Ing. Carlos López',
      category: 'Tecnología',
      totalEpisodes: 12,
      publishedEpisodes: 8,
      status: 'recording',
      startDate: '2025-01-01',
      frequency: 'weekly',
      platform: ['YouTube', 'Spotify'],
      averageDuration: 60,
      subscribers: 567
    },
    {
      id: '4',
      name: 'Derecho en Práctica',
      description: 'Análisis de casos jurídicos y cambios en legislación guatemalteca',
      host: 'Lic. María González',
      category: 'Derecho',
      totalEpisodes: 20,
      publishedEpisodes: 20,
      status: 'completed',
      startDate: '2024-03-01',
      frequency: 'monthly',
      platform: ['Spotify', 'Apple Podcasts', 'Google Podcasts'],
      averageDuration: 40,
      subscribers: 2100
    }
  ]

  // Categorías disponibles
  const categories = [
    'Educación',
    'Medicina', 
    'Tecnología',
    'Derecho',
    'Comunicación',
    'Administración'
  ]

  // Estadísticas
  const stats = [
    {
      title: 'Total Podcasts',
      value: podcasts.length.toString(),
      change: '+15%',
      trend: 'up' as const,
      icon: <Radio className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Episodios Publicados',
      value: podcasts.reduce((sum, p) => sum + p.publishedEpisodes, 0).toString(),
      change: '+22%',
      trend: 'up' as const,
      icon: <PlayCircle className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Suscriptores Total',
      value: podcasts.reduce((sum, p) => sum + p.subscribers, 0).toString(),
      change: '+18%',
      trend: 'up' as const,
      icon: <Users className="w-5 h-5 text-green-400" />
    }
  ]

  // Filtrar podcasts
  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesCategory = !selectedCategory || podcast.category === selectedCategory
    const matchesSearch = !searchTerm || 
      podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const getStatusBadge = (status: Podcast['status']) => {
    const variants = {
      planning: 'info',
      recording: 'warning',
      active: 'success',
      completed: 'secondary',
      'on-hold': 'danger'
    } as const

    const labels = {
      planning: 'Planificación',
      recording: 'Grabando',
      active: 'Activo',
      completed: 'Completado',
      'on-hold': 'En Pausa'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
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
    setSelectedPodcast(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestión de Podcasts
          </h1>
          <p className="text-zinc-400">
            Administración de podcasts institucionales y episodios
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/admin/podcasts/create')}
        >
          Nuevo Podcast
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar podcasts, hosts o temas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Filtrar por categoría"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value.toString())}
            options={[
              { value: '', label: 'Todas las categorías' },
              ...categories.map(category => ({
                value: category,
                label: category
              }))
            ]}
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Podcasts Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Podcast</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Episodios</TableHead>
              <TableHead>Frecuencia</TableHead>
              <TableHead>Suscriptores</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPodcasts.map((podcast) => (
              <TableRow key={podcast.id}>
                <TableCell>
                  <div>
                    <h4 className="font-medium text-white">{podcast.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" size="sm">{podcast.category}</Badge>
                      <span className="text-sm text-zinc-400">
                        {podcast.platform.join(', ')}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{podcast.host}</span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(podcast.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-700 rounded-full h-2 max-w-20">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(podcast.publishedEpisodes / podcast.totalEpisodes) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-zinc-400 min-w-[3rem]">
                      {podcast.publishedEpisodes}/{podcast.totalEpisodes}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{getFrequencyLabel(podcast.frequency)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{podcast.subscribers.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/podcasts/${podcast.id}`)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/podcasts/${podcast.id}/edit`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedPodcast(podcast)
                        setShowDeleteModal(true)
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            ¿Estás seguro de que deseas eliminar el podcast{' '}
            <span className="font-semibold text-white">
              "{selectedPodcast?.name}"
            </span>?
          </p>
          <p className="text-sm text-zinc-400">
            Esta acción eliminará también todos los episodios y tareas asociadas.
          </p>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeletePodcast}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PodcastsPage