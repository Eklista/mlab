// src/views/admin/projects/ProjectsCreatePage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Save, 
  PlayCircle, 
  Camera, 
  Mic, 
  GraduationCap,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  Textarea,
  Badge,
  Modal,
  type SelectOption
} from '@/core/components/ui'

interface ProjectFormData {
  title: string
  description: string
  type: string
  category: string
  client: string
  priority: string
  startDate: string
  endDate: string
  assignedTo: string
}

const ProjectsCreatePage = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    type: '',
    category: '',
    client: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    assignedTo: ''
  })

  const projectTypes: SelectOption[] = [
    {
      value: 'general',
      label: 'Proyecto General',
      description: 'Proyectos audiovisuales estándar'
    },
    {
      value: 'podcast',
      label: 'Podcast',
      description: 'Grabación y edición de podcasts'
    },
    {
      value: 'course',
      label: 'Curso',
      description: 'Material educativo y cátedras'
    },
    {
      value: 'video',
      label: 'Video',
      description: 'Producción de videos promocionales'
    }
  ]

  const categories: SelectOption[] = [
    { value: 'video', label: 'Video' },
    { value: 'fotografia', label: 'Fotografía' },
    { value: 'audio', label: 'Audio' },
    { value: 'diseno', label: 'Diseño Gráfico' },
    { value: 'animacion', label: 'Animación' },
    { value: 'livestream', label: 'Transmisión en Vivo' }
  ]

  const priorities: SelectOption[] = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' }
  ]

  const clients: SelectOption[] = [
    { value: 'medicina', label: 'Facultad de Medicina' },
    { value: 'ingenieria', label: 'Facultad de Ingeniería' },
    { value: 'derecho', label: 'Facultad de Derecho' },
    { value: 'rectoría', label: 'Rectoría' },
    { value: 'comunicacion', label: 'Facultad de Comunicación' },
    { value: 'otros', label: 'Otros' }
  ]

  const assignees: SelectOption[] = [
    { value: 'ana', label: 'Ana García' },
    { value: 'carlos', label: 'Carlos López' },
    { value: 'maria', label: 'María Rodríguez' },
    { value: 'pedro', label: 'Pedro Martínez' },
    { value: 'sofia', label: 'Sofía Hernández' }
  ]

  const handleInputChange = (field: keyof ProjectFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const required = ['title', 'description', 'type', 'category', 'client', 'startDate', 'endDate']
    const missing = required.filter(field => !formData[field as keyof ProjectFormData])
    return missing.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setShowValidationModal(true)
      return
    }

    setShowSuccessModal(true)
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false)
    navigate('/admin/projects/general')
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      general: <PlayCircle className="w-5 h-5" />,
      podcast: <Mic className="w-5 h-5" />,
      course: <GraduationCap className="w-5 h-5" />,
      video: <Camera className="w-5 h-5" />
    }
    return icons[type as keyof typeof icons] || <PlayCircle className="w-5 h-5" />
  }

  const selectedType = projectTypes.find(type => type.value === formData.type)

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
          Volver
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Crear Nuevo Proyecto
          </h1>
          <p className="text-zinc-400">
            Completa la información para crear un nuevo proyecto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Type Selection */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {selectedType && getTypeIcon(formData.type)}
              <h3 className="text-lg font-semibold text-white">
                Tipo de Proyecto
              </h3>
              {selectedType && (
                <Badge variant="info">{selectedType.label}</Badge>
              )}
            </div>
            
            <Select
              label="Selecciona el tipo de proyecto"
              value={formData.type}
              onChange={(value) => handleInputChange('type', value)}
              options={projectTypes}
              placeholder="Elige un tipo de proyecto..."
            />
          </div>
        </Card>

        {/* Basic Information */}
        <Card>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Título del Proyecto"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ej: Video promocional para nueva maestría"
                />
              </div>
              
              <Select
                label="Categoría"
                value={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                options={categories}
                placeholder="Selecciona una categoría"
              />
              
              <Select
                label="Cliente"
                value={formData.client}
                onChange={(value) => handleInputChange('client', value)}
                options={clients}
                placeholder="Selecciona el cliente"
              />
              
              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe los objetivos y alcance del proyecto..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Project Details */}
        <Card>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Detalles del Proyecto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Fecha de Inicio"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
              
              <Input
                label="Fecha de Entrega"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
              
              <Select
                label="Prioridad"
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value)}
                options={priorities}
              />
              
              <Select
                label="Asignado a"
                value={formData.assignedTo}
                onChange={(value) => handleInputChange('assignedTo', value)}
                options={assignees}
                placeholder="Selecciona responsable"
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/projects/general')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Crear Proyecto
            </Button>
          </div>
        </Card>
      </form>

      {/* Validation Error Modal */}
      <Modal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title="Campos Requeridos"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-300 mb-2">
                Por favor completa todos los campos obligatorios:
              </p>
              <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                <li>Título del proyecto</li>
                <li>Descripción</li>
                <li>Tipo de proyecto</li>
                <li>Categoría</li>
                <li>Cliente</li>
                <li>Fechas de inicio y entrega</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowValidationModal(false)}>
              Entendido
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessConfirm}
        title="¡Proyecto Creado!"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            El proyecto <span className="font-semibold text-white">"{formData.title}"</span> ha sido creado exitosamente.
          </p>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSuccessConfirm}>
              Ver Proyectos
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectsCreatePage