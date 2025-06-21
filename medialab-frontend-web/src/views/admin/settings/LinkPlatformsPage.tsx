import { useState, createElement } from 'react'
import { 
  Plus, 
  Search,
  Link as LinkIcon,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Globe,
  Video,
  Music,
  Database,
  FolderOpen,
  Users
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input,
  Badge,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Textarea,
  Select,
  IconPicker
} from '@/core/components/ui'
import type { SelectOption } from '@/core/components/ui'

interface LinkPlatform {
  id: string
  code: string
  name: string
  domainPattern: string
  urlValidationRegex: string
  icon: string
  color: string
  category: 'video' | 'audio' | 'storage' | 'social' | 'streaming' | 'other'
  isActive: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
}

const LinkPlatformsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<LinkPlatform | null>(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    domainPattern: '',
    urlValidationRegex: '',
    icon: 'SiLink',
    color: '#3B82F6',
    category: 'other' as LinkPlatform['category'],
    isActive: true
  })

  // Mock data con iconos de React Icons
  const linkPlatforms: LinkPlatform[] = [
    {
      id: '1',
      code: 'YOUTUBE',
      name: 'YouTube',
      domainPattern: 'youtube.com',
      urlValidationRegex: '^https?:\\/\\/(www\\.)?(youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11}).*$',
      icon: 'SiYoutube',
      color: '#FF0000',
      category: 'video',
      isActive: true,
      usageCount: 45,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-06-01T15:30:00Z'
    },
    {
      id: '2',
      code: 'SPOTIFY',
      name: 'Spotify',
      domainPattern: 'open.spotify.com',
      urlValidationRegex: '^https?:\\/\\/open\\.spotify\\.com\\/(track|album|playlist|artist)\\/([a-zA-Z0-9]{22}).*$',
      icon: 'SiSpotify',
      color: '#1DB954',
      category: 'audio',
      isActive: true,
      usageCount: 28,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-05-15T11:20:00Z'
    },
    {
      id: '3',
      code: 'GOOGLE_DRIVE',
      name: 'Google Drive',
      domainPattern: 'drive.google.com',
      urlValidationRegex: '^https?:\\/\\/drive\\.google\\.com\\/(file\\/d\\/|open\\?id=)([a-zA-Z0-9_-]+).*$',
      icon: 'SiGoogledrive',
      color: '#4285F4',
      category: 'storage',
      isActive: true,
      usageCount: 67,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-04-20T14:45:00Z'
    },
    {
      id: '4',
      code: 'SYNOLOGY_NAS',
      name: 'Synology NAS',
      domainPattern: 'medialab-nas.galileo.edu',
      urlValidationRegex: '^https?:\\/\\/medialab-nas\\.galileo\\.edu\\/.*$',
      icon: 'Database',
      color: '#FF8C00',
      category: 'storage',
      isActive: true,
      usageCount: 89,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-03-10T09:30:00Z'
    },
    {
      id: '5',
      code: 'VIMEO',
      name: 'Vimeo',
      domainPattern: 'vimeo.com',
      urlValidationRegex: '^https?:\\/\\/(www\\.)?vimeo\\.com\\/([0-9]+).*$',
      icon: 'SiVimeo',
      color: '#1AB7EA',
      category: 'video',
      isActive: true,
      usageCount: 12,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-02-15T16:10:00Z'
    },
    {
      id: '6',
      code: 'FACEBOOK',
      name: 'Facebook',
      domainPattern: 'facebook.com',
      urlValidationRegex: '^https?:\\/\\/(www\\.)?facebook\\.com\\/.*$',
      icon: 'SiFacebook',
      color: '#1877F2',
      category: 'social',
      isActive: true,
      usageCount: 15,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-20T10:15:00Z'
    }
  ]

  // Opciones para categorías
  const categoryOptions: SelectOption[] = [
    { value: '', label: 'Todas las categorías' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
    { value: 'storage', label: 'Almacenamiento' },
    { value: 'social', label: 'Redes Sociales' },
    { value: 'streaming', label: 'Streaming' },
    { value: 'other', label: 'Otros' }
  ]

  const categoryOptionsCreate = categoryOptions.slice(1)

  // Colores predefinidos
  const platformColors = [
    '#FF0000', '#1DB954', '#4285F4', '#FF8C00', '#1AB7EA', '#9146FF',
    '#1877F2', '#E4405F', '#FF5500', '#0078D4', '#00D4AA', '#FF6B6B'
  ]

  // Función para obtener componente de icono (simplificada por ahora)
  const getIconComponent = (iconName: string) => {
    // Por ahora usar iconos de Lucide como fallback
    const iconMap: {[key: string]: any} = {
      'SiYoutube': Video,
      'SiSpotify': Music,
      'SiGoogledrive': FolderOpen,
      'SiVimeo': Video,
      'SiFacebook': Users,
      'Database': Database
    }
    
    return iconMap[iconName] || LinkIcon
  }

  // Filtrar plataformas
  const filteredPlatforms = linkPlatforms.filter(platform => {
    const matchesSearch = !searchTerm || 
      platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.domainPattern.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || platform.category === selectedCategory
    const matchesActive = !showActiveOnly || platform.isActive
    
    return matchesSearch && matchesCategory && matchesActive
  })

  const getCategoryBadge = (category: string) => {
    const variants = {
      video: 'danger' as const,
      audio: 'success' as const,
      storage: 'info' as const,
      social: 'warning' as const,
      streaming: 'secondary' as const,
      other: 'default' as const
    }

    const labels = {
      video: 'Video',
      audio: 'Audio',
      storage: 'Almacenamiento',
      social: 'Social',
      streaming: 'Streaming',
      other: 'Otros'
    }

    return (
      <Badge variant={variants[category as keyof typeof variants] || 'default'} size="sm">
        {labels[category as keyof typeof labels] || 'Desconocido'}
      </Badge>
    )
  }

  const handleCreate = () => {
    console.log('Crear plataforma:', formData)
    setShowCreateModal(false)
    resetForm()
  }

  const handleEdit = (platform: LinkPlatform) => {
    setSelectedPlatform(platform)
    setFormData({
      code: platform.code,
      name: platform.name,
      domainPattern: platform.domainPattern,
      urlValidationRegex: platform.urlValidationRegex,
      icon: platform.icon,
      color: platform.color,
      category: platform.category,
      isActive: platform.isActive
    })
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    console.log('Actualizar plataforma:', selectedPlatform?.id, formData)
    setShowEditModal(false)
    setSelectedPlatform(null)
    resetForm()
  }

  const handleDelete = () => {
    console.log('Eliminar plataforma:', selectedPlatform?.id)
    setShowDeleteModal(false)
    setSelectedPlatform(null)
  }

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      domainPattern: '',
      urlValidationRegex: '',
      icon: 'SiLink',
      color: '#3B82F6',
      category: 'other',
      isActive: true
    })
  }

  const toggleStatus = (platform: LinkPlatform) => {
    console.log('Toggle status:', platform.id, !platform.isActive)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Plataformas de Enlaces
          </h1>
          <p className="text-zinc-400">
            Configuración de plataformas externas para publicación de deliverables
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowCreateModal(true)}
        >
          Nueva Plataforma
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <LinkIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {linkPlatforms.filter(p => p.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Plataformas Activas</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <ExternalLink className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {linkPlatforms.reduce((sum, platform) => sum + platform.usageCount, 0)}
              </p>
              <p className="text-sm text-zinc-400">Enlaces Totales</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Video className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {linkPlatforms.filter(p => p.category === 'video' && p.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Plataformas Video</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {linkPlatforms.filter(p => p.category === 'storage' && p.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Almacenamiento</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre, código o dominio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value as string)}
              options={categoryOptions}
              placeholder="Filtrar por categoría"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activeOnly"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="rounded border-zinc-600"
            />
            <label htmlFor="activeOnly" className="text-sm text-zinc-300">
              Solo activas
            </label>
          </div>
        </div>
      </Card>

      {/* Platforms Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Plataforma</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Dominio</TableHead>
              <TableHead>Uso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlatforms.map((platform) => {
              const IconComponent = getIconComponent(platform.icon)
              
              return (
                <TableRow key={platform.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: platform.color }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {platform.name}
                        </h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Validación URL configurada
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                      {platform.code}
                    </code>
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(platform.category)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-300 text-sm font-mono">
                        {platform.domainPattern}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                      <span className="text-white font-medium">{platform.usageCount}</span>
                      <span className="text-zinc-400 text-sm">enlaces</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStatus(platform)}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      {platform.isActive ? (
                        <Badge variant="success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Activa
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactiva
                        </Badge>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit className="w-4 h-4" />}
                        onClick={() => handleEdit(platform)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedPlatform(platform)
                          setShowDeleteModal(true)
                        }}
                        disabled={platform.usageCount > 0}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nueva Plataforma de Enlaces"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Código"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
              placeholder="ej: YOUTUBE"
            />
            
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ej: YouTube"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Dominio"
              value={formData.domainPattern}
              onChange={(e) => setFormData(prev => ({ ...prev, domainPattern: e.target.value }))}
              placeholder="ej: youtube.com"
            />

            <Select
              label="Categoría"
              value={formData.category}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
              options={categoryOptionsCreate}
            />
          </div>
          
          <Textarea
            label="Regex de Validación de URL"
            value={formData.urlValidationRegex}
            onChange={(e) => setFormData(prev => ({ ...prev, urlValidationRegex: e.target.value }))}
            placeholder="^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11}).*$"
            rows={3}
          />

          {/* Icon and Color Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Icono
              </label>
              <IconPicker
                value={formData.icon}
                onChange={(iconName) => setFormData(prev => ({ ...prev, icon: iconName }))}
                placeholder="Seleccionar icono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {platformColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      formData.color === color 
                        ? 'border-white scale-110' 
                        : 'border-zinc-600 hover:border-zinc-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border border-zinc-700 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Vista Previa</h4>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: formData.color }}
              >
                {createElement(getIconComponent(formData.icon), { className: "w-5 h-5" })}
              </div>
              <div>
                <h5 className="font-medium text-white">{formData.name || 'Nombre de la plataforma'}</h5>
                <p className="text-sm text-zinc-400">{formData.domainPattern || 'dominio.com'}</p>
              </div>
              {getCategoryBadge(formData.category)}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActiveCreate"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded border-zinc-600"
            />
            <label htmlFor="isActiveCreate" className="text-sm text-zinc-300">
              Plataforma activa
            </label>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={!formData.code || !formData.name || !formData.domainPattern}
            >
              Crear
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Plataforma de Enlaces"
        size="lg"
      >
        {selectedPlatform && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Código"
                value={formData.code}
                disabled
              />
              
              <Input
                label="Nombre"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="ej: YouTube"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Dominio"
                value={formData.domainPattern}
                onChange={(e) => setFormData(prev => ({ ...prev, domainPattern: e.target.value }))}
                placeholder="ej: youtube.com"
              />

              <Select
                label="Categoría"
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
                options={categoryOptionsCreate}
              />
            </div>
            
            <Textarea
              label="Regex de Validación de URL"
              value={formData.urlValidationRegex}
              onChange={(e) => setFormData(prev => ({ ...prev, urlValidationRegex: e.target.value }))}
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Icono
                </label>
                <IconPicker
                  value={formData.icon}
                  onChange={(iconName) => setFormData(prev => ({ ...prev, icon: iconName }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {platformColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        formData.color === color 
                          ? 'border-white scale-110' 
                          : 'border-zinc-600 hover:border-zinc-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActiveEdit"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-zinc-600"
              />
              <label htmlFor="isActiveEdit" className="text-sm text-zinc-300">
                Plataforma activa
              </label>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdate}>
                Actualizar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            ¿Estás seguro de que deseas eliminar la plataforma{' '}
            <span className="font-semibold text-white">
              "{selectedPlatform?.name}"
            </span>?
          </p>
          
          {selectedPlatform?.usageCount === 0 ? (
            <p className="text-sm text-zinc-400">
              Esta plataforma no tiene enlaces asociados y se puede eliminar sin problemas.
            </p>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm">
                ❌ No se puede eliminar esta plataforma porque tiene {selectedPlatform?.usageCount} enlace(s) en uso.
              </p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              disabled={selectedPlatform?.usageCount! > 0}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LinkPlatformsPage