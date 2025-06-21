// src/views/admin/requests/RequestsPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Building,
  ArrowRight
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

interface Request {
  id: string
  requestNumber: string
  title: string
  description: string
  type: 'video' | 'fotografia' | 'audio' | 'diseno' | 'animacion' | 'livestream'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'in-progress' | 'completed'
  clientName: string
  clientEmail: string
  clientUnit: string
  requestedBy: string
  assignedTo?: string
  estimatedHours?: number
  estimatedCost?: number
  dueDate: string
  requestDate: string
  approvalDate?: string
  completionDate?: string
  projectId?: string
  requirements: string[]
  deliverables: string[]
  createdAt: string
  updatedAt: string
}

const RequestsPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data - Solicitudes
  const requests: Request[] = [
    {
      id: '1',
      requestNumber: 'REQ-2025-001',
      title: 'Video Promocional Nueva Maestría',
      description: 'Producción de video promocional para la nueva maestría en Medicina Interna. Incluye entrevistas a profesores y estudiantes.',
      type: 'video',
      priority: 'high',
      status: 'approved',
      clientName: 'Dr. Carlos López',
      clientEmail: 'carlos.lopez@medicina.galileo.edu',
      clientUnit: 'Facultad de Medicina',
      requestedBy: 'Secretaría Académica',
      assignedTo: 'Ana García',
      estimatedHours: 40,
      estimatedCost: 8500,
      dueDate: '2025-07-15',
      requestDate: '2025-05-28',
      approvalDate: '2025-06-01',
      projectId: '1',
      requirements: [
        'Grabación en instalaciones de la facultad',
        'Entrevistas a 3 profesores y 2 estudiantes',
        'Duración aproximada de 3-4 minutos',
        'Incluir logo institucional'
      ],
      deliverables: [
        'Video principal (4K)',
        'Versión para redes sociales',
        'Material gráfico utilizado'
      ],
      createdAt: '2025-05-28T10:00:00Z',
      updatedAt: '2025-06-01T15:30:00Z'
    },
    {
      id: '2',
      requestNumber: 'REQ-2025-002',
      title: 'Fotografía Evento Graduación',
      description: 'Cobertura fotográfica completa del evento de graduación incluyendo ceremonia, retratos y momentos especiales.',
      type: 'fotografia',
      priority: 'medium',
      status: 'in-progress',
      clientName: 'Lic. María González',
      clientEmail: 'maria.gonzalez@rectoria.galileo.edu',
      clientUnit: 'Rectoría',
      requestedBy: 'Departamento de Eventos',
      assignedTo: 'Carlos López',
      estimatedHours: 16,
      estimatedCost: 3200,
      dueDate: '2025-07-22',
      requestDate: '2025-06-10',
      approvalDate: '2025-06-12',
      projectId: '2',
      requirements: [
        'Cobertura de 8 horas del evento',
        'Fotografía de alta resolución',
        'Entrega en máximo 48 horas',
        'Mínimo 200 fotografías editadas'
      ],
      deliverables: [
        'Galería digital de fotos editadas',
        'Fotografías impresas para autoridades',
        'Video resumen del evento'
      ],
      createdAt: '2025-06-10T14:20:00Z',
      updatedAt: '2025-06-15T09:45:00Z'
    },
    {
      id: '3',
      requestNumber: 'REQ-2025-003',
      title: 'Diseño Material Promocional',
      description: 'Diseño de material gráfico para campaña de nueva carrera incluyendo banners, flyers y contenido digital.',
      type: 'diseno',
      priority: 'medium',
      status: 'in-review',
      clientName: 'Ing. Roberto Méndez',
      clientEmail: 'roberto.mendez@ingenieria.galileo.edu',
      clientUnit: 'Facultad de Ingeniería',
      requestedBy: 'Coordinación Académica',
      estimatedHours: 24,
      estimatedCost: 4800,
      dueDate: '2025-07-30',
      requestDate: '2025-06-15',
      requirements: [
        'Seguir lineamientos de marca institucional',
        '5 diseños diferentes de banners',
        'Versiones para redes sociales',
        'Material imprimible en alta resolución'
      ],
      deliverables: [
        'Banners web (diversos tamaños)',
        'Flyers para impresión',
        'Posts para redes sociales',
        'Archivos fuente editables'
      ],
      createdAt: '2025-06-15T11:30:00Z',
      updatedAt: '2025-06-18T16:20:00Z'
    },
    {
      id: '4',
      requestNumber: 'REQ-2025-004',
      title: 'Podcast Serie Educativa',
      description: 'Producción de serie de podcasts educativos sobre innovación tecnológica con 6 episodios.',
      type: 'audio',
      priority: 'low',
      status: 'pending',
      clientName: 'Dra. Ana Martínez',
      clientEmail: 'ana.martinez@idea.galileo.edu',
      clientUnit: 'Instituto IDEA',
      requestedBy: 'Dirección de Investigación',
      estimatedHours: 60,
      estimatedCost: 12000,
      dueDate: '2025-09-15',
      requestDate: '2025-06-18',
      requirements: [
        '6 episodios de 30-45 minutos cada uno',
        'Invitados expertos externos',
        'Edición profesional y masterización',
        'Distribución en plataformas principales'
      ],
      deliverables: [
        '6 episodios editados y masterizados',
        'Intro y outro personalizados',
        'Material gráfico para promoción',
        'Transcripciones de cada episodio'
      ],
      createdAt: '2025-06-18T09:15:00Z',
      updatedAt: '2025-06-18T09:15:00Z'
    },
    {
      id: '5',
      requestNumber: 'REQ-2025-005',
      title: 'Transmisión en Vivo Conferencia',
      description: 'Transmisión en vivo de conferencia magistral internacional con traducción simultánea.',
      type: 'livestream',
      priority: 'urgent',
      status: 'rejected',
      clientName: 'Dr. Pedro Silva',
      clientEmail: 'pedro.silva@comunicacion.galileo.edu',
      clientUnit: 'Facultad de Comunicación',
      requestedBy: 'Decanato',
      dueDate: '2025-06-25',
      requestDate: '2025-06-20',
      requirements: [
        'Transmisión simultánea en 3 plataformas',
        'Capacidad para 500 espectadores',
        'Audio en 2 idiomas',
        'Grabación para posterior edición'
      ],
      deliverables: [
        'Transmisión en vivo',
        'Grabación completa del evento',
        'Estadísticas de audiencia',
        'Video editado para archivo'
      ],
      createdAt: '2025-06-20T13:45:00Z',
      updatedAt: '2025-06-20T16:30:00Z'
    }
  ]

  // Estadísticas
  const stats = [
    {
      title: 'Total Solicitudes',
      value: requests.length.toString(),
      change: '+15%',
      trend: 'up' as const,
      icon: <FileText className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Pendientes',
      value: requests.filter(r => r.status === 'pending' || r.status === 'in-review').length.toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <Clock className="w-5 h-5 text-yellow-400" />
    },
    {
      title: 'Aprobadas',
      value: requests.filter(r => r.status === 'approved' || r.status === 'in-progress').length.toString(),
      change: '+22%',
      trend: 'up' as const,
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    }
  ]

  // Filtrar solicitudes
  const filteredRequests = requests.filter(request => {
    const matchesSearch = !searchTerm || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientUnit.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = !selectedType || request.type === selectedType
    const matchesStatus = !selectedStatus || request.status === selectedStatus
    const matchesPriority = !selectedPriority || request.priority === selectedPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: Request['status']) => {
    const variants = {
      pending: 'secondary',
      'in-review': 'warning',
      approved: 'success',
      rejected: 'danger',
      'in-progress': 'info',
      completed: 'success'
    } as const

    const labels = {
      pending: 'Pendiente',
      'in-review': 'En Revisión',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      'in-progress': 'En Progreso',
      completed: 'Completada'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Request['priority']) => {
    const variants = {
      low: 'secondary',
      medium: 'warning',
      high: 'danger',
      urgent: 'danger'
    } as const

    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      urgent: 'Urgente'
    }

    const icons = {
      low: '',
      medium: '',
      high: '⚡',
      urgent: '🚨'
    }

    return (
      <Badge variant={variants[priority]} size="sm">
        {icons[priority]} {labels[priority]}
      </Badge>
    )
  }

  const getTypeIcon = (type: Request['type']) => {
    const icons = {
      video: '🎬',
      fotografia: '📸',
      audio: '🎵',
      diseno: '🎨',
      animacion: '✨',
      livestream: '📡'
    }
    return icons[type] || '📄'
  }

  const getTypeLabel = (type: Request['type']) => {
    const labels = {
      video: 'Video',
      fotografia: 'Fotografía',
      audio: 'Audio',
      diseno: 'Diseño Gráfico',
      animacion: 'Animación',
      livestream: 'Transmisión en Vivo'
    }
    return labels[type]
  }

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request)
    setShowRequestModal(true)
  }

  const handleDeleteRequest = () => {
    setShowDeleteModal(false)
    setSelectedRequest(null)
  }

  const handleConvertToProject = (requestId: string) => {
    console.log('Convirtiendo solicitud a proyecto:', requestId)
    // Aquí iría la lógica para convertir la solicitud en proyecto
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestión de Solicitudes
          </h1>
          <p className="text-zinc-400">
            Administración de solicitudes de servicios audiovisuales
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/admin/requests/create')}
        >
          Nueva Solicitud
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
              placeholder="Buscar por título, número, cliente o unidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Tipo de servicio"
            value={selectedType}
            onChange={(value) => setSelectedType(value.toString())}
            options={[
              { value: '', label: 'Todos los tipos' },
              { value: 'video', label: 'Video' },
              { value: 'fotografia', label: 'Fotografía' },
              { value: 'audio', label: 'Audio' },
              { value: 'diseno', label: 'Diseño Gráfico' },
              { value: 'animacion', label: 'Animación' },
              { value: 'livestream', label: 'Transmisión en Vivo' }
            ]}
          />
          <Select
            placeholder="Estado"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value.toString())}
            options={[
              { value: '', label: 'Todos los estados' },
              { value: 'pending', label: 'Pendiente' },
              { value: 'in-review', label: 'En Revisión' },
              { value: 'approved', label: 'Aprobada' },
              { value: 'rejected', label: 'Rechazada' },
              { value: 'in-progress', label: 'En Progreso' },
              { value: 'completed', label: 'Completada' }
            ]}
          />
          <Select
            placeholder="Prioridad"
            value={selectedPriority}
            onChange={(value) => setSelectedPriority(value.toString())}
            options={[
              { value: '', label: 'Todas las prioridades' },
              { value: 'low', label: 'Baja' },
              { value: 'medium', label: 'Media' },
              { value: 'high', label: 'Alta' },
              { value: 'urgent', label: 'Urgente' }
            ]}
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Requests Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Solicitud</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Fecha Límite</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <h4 className="font-medium text-white">{request.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-400">
                        {request.requestNumber}
                      </code>
                      <span className="text-sm text-zinc-400">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="text-white font-medium">{request.clientName}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="w-3 h-3 text-zinc-500" />
                      <span className="text-sm text-zinc-400">{request.clientUnit}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(request.type)}</span>
                    <span className="text-zinc-300">{getTypeLabel(request.type)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(request.status)}
                </TableCell>
                <TableCell>
                  {getPriorityBadge(request.priority)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-300 text-sm">
                      {new Date(request.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => handleViewRequest(request)}
                    >
                      Ver
                    </Button>
                    {request.status === 'approved' && !request.projectId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<ArrowRight className="w-4 h-4" />}
                        onClick={() => handleConvertToProject(request.id)}
                      >
                        Crear Proyecto
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/requests/${request.id}/edit`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedRequest(request)
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

      {/* Request Detail Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => {
          setShowRequestModal(false)
          setSelectedRequest(null)
        }}
        title="Detalles de la Solicitud"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedRequest.title}
                </h3>
                <div className="flex items-center gap-3">
                  <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                    {selectedRequest.requestNumber}
                  </code>
                  {getStatusBadge(selectedRequest.status)}
                  {getPriorityBadge(selectedRequest.priority)}
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl">{getTypeIcon(selectedRequest.type)}</span>
                <p className="text-sm text-zinc-400 mt-1">{getTypeLabel(selectedRequest.type)}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-zinc-400">Descripción</label>
              <p className="text-white bg-zinc-800/30 p-3 rounded-lg mt-1">
                {selectedRequest.description}
              </p>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Cliente
                </label>
                <p className="text-white font-medium">{selectedRequest.clientName}</p>
                <p className="text-sm text-zinc-400">{selectedRequest.clientEmail}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400 flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  Unidad
                </label>
                <p className="text-white font-medium">{selectedRequest.clientUnit}</p>
                <p className="text-sm text-zinc-400">{selectedRequest.requestedBy}</p>
              </div>
            </div>

            {/* Dates and Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-zinc-400">Fecha de Solicitud</label>
                <p className="text-white font-medium">
                  {new Date(selectedRequest.requestDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Fecha Límite</label>
                <p className="text-white font-medium">
                  {new Date(selectedRequest.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Asignado a</label>
                <p className="text-white font-medium">
                  {selectedRequest.assignedTo || 'Sin asignar'}
                </p>
              </div>
            </div>

            {/* Estimation */}
            {(selectedRequest.estimatedHours || selectedRequest.estimatedCost) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedRequest.estimatedHours && (
                  <div>
                    <label className="text-sm text-zinc-400">Horas Estimadas</label>
                    <p className="text-white font-medium">{selectedRequest.estimatedHours}h</p>
                  </div>
                )}
                {selectedRequest.estimatedCost && (
                  <div>
                    <label className="text-sm text-zinc-400">Costo Estimado</label>
                    <p className="text-white font-medium">Q{selectedRequest.estimatedCost.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}

            {/* Requirements */}
            <div>
              <label className="text-sm text-zinc-400">Requerimientos</label>
              <ul className="text-white text-sm mt-1 space-y-1">
                {selectedRequest.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-zinc-500 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <label className="text-sm text-zinc-400">Entregables</label>
              <ul className="text-white text-sm mt-1 space-y-1">
                {selectedRequest.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Link */}
            {selectedRequest.projectId && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Proyecto Creado</span>
                </div>
                <p className="text-emerald-200 text-sm">
                  Esta solicitud ha sido convertida en un proyecto activo.
                </p>
                <Button 
                  size="sm" 
                  className="mt-3"
                  onClick={() => navigate(`/admin/projects/${selectedRequest.projectId}/details`)}
                >
                  Ver Proyecto
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowRequestModal(false)
                  setSelectedRequest(null)
                }}
              >
                Cerrar
              </Button>
              {selectedRequest.status === 'approved' && !selectedRequest.projectId && (
                <Button 
                  leftIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => handleConvertToProject(selectedRequest.id)}
                >
                  Crear Proyecto
                </Button>
              )}
              <Button 
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowRequestModal(false)
                  navigate(`/admin/requests/${selectedRequest.id}/edit`)
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            ¿Estás seguro de que deseas eliminar la solicitud{' '}
            <span className="font-semibold text-white">
              "{selectedRequest?.title}"
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
              onClick={handleDeleteRequest}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default RequestsPage