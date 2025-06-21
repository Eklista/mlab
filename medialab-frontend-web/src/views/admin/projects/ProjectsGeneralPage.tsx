// src/views/admin/projects/ProjectsGeneralPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  PlayCircle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input, 
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

interface Project {
  id: string
  title: string
  description: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high'
  client: string
  assignedTo: string[]
  startDate: string
  endDate: string
  progress: number
  category: string
}

const ProjectsGeneralPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Mock data - solo 2 proyectos
  const projects: Project[] = [
    {
      id: '1',
      title: 'Video Promocional Facultad de Medicina',
      description: 'Producción de video promocional para la nueva maestría en Medicina Interna.',
      status: 'in-progress',
      priority: 'high',
      client: 'Facultad de Medicina',
      assignedTo: ['Ana García', 'Carlos López'],
      startDate: '2025-06-01',
      endDate: '2025-07-15',
      progress: 65,
      category: 'Video'
    },
    {
      id: '2',
      title: 'Fotografía Evento Graduación',
      description: 'Cobertura fotográfica completa del evento de graduación 2025.',
      status: 'planning',
      priority: 'medium',
      client: 'Rectoría',
      assignedTo: ['María Rodríguez'],
      startDate: '2025-07-20',
      endDate: '2025-07-22',
      progress: 10,
      category: 'Fotografía'
    }
  ]

  const stats = [
    {
      title: 'Total Proyectos',
      value: '2',
      change: '+0%',
      trend: 'neutral' as const,
      icon: <PlayCircle className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'En Progreso',
      value: '1',
      change: '+50%',
      trend: 'up' as const,
      icon: <Calendar className="w-5 h-5 text-orange-400" />
    },
    {
      title: 'Completados',
      value: '0',
      change: '0%',
      trend: 'neutral' as const,
      icon: <Users className="w-5 h-5 text-green-400" />
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
      <Badge variant={variants[status]}>
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
      <Badge variant={variants[priority]} size="sm">
        {labels[priority]}
      </Badge>
    )
  }

  const handleDeleteProject = () => {
    setShowDeleteModal(false)
    setShowSuccessModal(true)
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Proyectos Generales
          </h1>
          <p className="text-zinc-400">
            Gestión y seguimiento de proyectos audiovisuales
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/admin/projects/create')}
        >
          Nuevo Proyecto
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
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filtros
          </Button>
        </div>
      </Card>

      {/* Projects Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Proyecto</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Fecha Entrega</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects
              .filter(project => 
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <h4 className="font-medium text-white">{project.title}</h4>
                      <p className="text-sm text-zinc-400 truncate max-w-xs">
                        {project.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-zinc-300">{project.client}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(project.status)}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(project.priority)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-zinc-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-stone-50 to-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-zinc-400 min-w-[3rem]">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-zinc-300">
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye className="w-4 h-4" />}
                        onClick={() => navigate(`/admin/projects/${project.id}/details`)}
                      >
                        Ver
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit className="w-4 h-4" />}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedProject(project)
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
            ¿Estás seguro de que deseas eliminar el proyecto{' '}
            <span className="font-semibold text-white">
              "{selectedProject?.title}"
            </span>?
          </p>
          <p className="text-sm text-zinc-400">
            Esta acción no se puede deshacer.
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
              onClick={handleDeleteProject}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Proyecto Eliminado!"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            El proyecto ha sido eliminado exitosamente.
          </p>
          
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowSuccessModal(false)}>
              Continuar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectsGeneralPage