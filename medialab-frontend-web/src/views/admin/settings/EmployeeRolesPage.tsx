// src/views/admin/settings/EmployeeRolesPage.tsx
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter,
  Shield,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle
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
  Textarea
} from '@/core/components/ui'

interface EmployeeRole {
  id: string
  code: string
  name: string
  description: string
  color: string
  isActive: boolean
  employeeCount: number
  createdAt: string
  updatedAt: string
}

const EmployeeRolesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<EmployeeRole | null>(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    color: '#3B82F6',
    isActive: true
  })

  // Mock data - Roles de empleado
  const employeeRoles: EmployeeRole[] = [
    {
      id: '1',
      code: 'DIRECTOR',
      name: 'Director',
      description: 'Director del departamento Medialab',
      color: '#8B5CF6',
      isActive: true,
      employeeCount: 1,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-06-01T15:30:00Z'
    },
    {
      id: '2',
      code: 'COORD_PROD',
      name: 'Coordinador de Producción',
      description: 'Responsable de coordinar proyectos audiovisuales',
      color: '#3B82F6',
      isActive: true,
      employeeCount: 2,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-05-15T11:20:00Z'
    },
    {
      id: '3',
      code: 'EDITOR',
      name: 'Editor de Video',
      description: 'Especialista en edición y post-producción',
      color: '#10B981',
      isActive: true,
      employeeCount: 3,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-04-20T14:45:00Z'
    },
    {
      id: '4',
      code: 'CAMAROGRAFO',
      name: 'Camarógrafo',
      description: 'Operador de cámara y equipos de grabación',
      color: '#F59E0B',
      isActive: true,
      employeeCount: 2,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-03-10T09:30:00Z'
    },
    {
      id: '5',
      code: 'DISEÑADOR',
      name: 'Diseñador Gráfico',
      description: 'Especialista en diseño gráfico y animación',
      color: '#EC4899',
      isActive: true,
      employeeCount: 1,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-02-15T16:10:00Z'
    },
    {
      id: '6',
      code: 'TECNICO',
      name: 'Técnico de Soporte',
      description: 'Soporte técnico y mantenimiento de equipos',
      color: '#EF4444',
      isActive: true,
      employeeCount: 1,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-25T13:40:00Z'
    },
    {
      id: '7',
      code: 'ASISTENTE_OLD',
      name: 'Asistente de Producción',
      description: 'Rol obsoleto - migrado a Coordinador Jr.',
      color: '#6B7280',
      isActive: false,
      employeeCount: 0,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-05-01T10:00:00Z'
    }
  ]

  // Colores predefinidos para roles
  const roleColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EC4899', // Pink
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1'  // Indigo
  ]

  // Filtrar roles
  const filteredRoles = employeeRoles.filter(role => {
    const matchesSearch = !searchTerm || 
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesActive = !showActiveOnly || role.isActive
    
    return matchesSearch && matchesActive
  })

  const handleCreate = () => {
    console.log('Crear rol:', formData)
    setShowCreateModal(false)
    resetForm()
  }

  const handleEdit = (role: EmployeeRole) => {
    setSelectedRole(role)
    setFormData({
      code: role.code,
      name: role.name,
      description: role.description,
      color: role.color,
      isActive: role.isActive
    })
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    console.log('Actualizar rol:', selectedRole?.id, formData)
    setShowEditModal(false)
    setSelectedRole(null)
    resetForm()
  }

  const handleDelete = () => {
    console.log('Eliminar rol:', selectedRole?.id)
    setShowDeleteModal(false)
    setSelectedRole(null)
  }

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      color: '#3B82F6',
      isActive: true
    })
  }

  const toggleStatus = (role: EmployeeRole) => {
    console.log('Toggle status:', role.id, !role.isActive)
    // Aquí iría la lógica para cambiar el estado
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Roles de Empleado
          </h1>
          <p className="text-zinc-400">
            Configuración de roles y responsabilidades del personal
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowCreateModal(true)}
        >
          Nuevo Rol
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {employeeRoles.filter(r => r.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Roles Activos</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {employeeRoles.reduce((sum, role) => sum + role.employeeCount, 0)}
              </p>
              <p className="text-sm text-zinc-400">Empleados Asignados</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {Math.round((employeeRoles.filter(r => r.isActive).length / employeeRoles.length) * 100)}%
              </p>
              <p className="text-sm text-zinc-400">Roles Utilizados</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {employeeRoles.filter(r => !r.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Roles Inactivos</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre, código o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
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
              Solo activos
            </label>
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Roles Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Rol</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Empleados</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Actualización</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: role.color }}
                    />
                    <div>
                      <h4 className="font-medium text-white">
                        {role.name}
                      </h4>
                      <p className="text-sm text-zinc-400 mt-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                    {role.code}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <span className="text-white font-medium">{role.employeeCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleStatus(role)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {role.isActive ? (
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="w-3 h-3 mr-1" />
                        Inactivo
                      </Badge>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300 text-sm">
                    {new Date(role.updatedAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => handleEdit(role)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedRole(role)
                        setShowDeleteModal(true)
                      }}
                      disabled={role.employeeCount > 0}
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

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nuevo Rol de Empleado"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Código"
            value={formData.code}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
            placeholder="ej: EDITOR_SR"
          />
          
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="ej: Editor Senior"
          />
          
          <Textarea
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descripción de las responsabilidades del rol"
            rows={3}
          />
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {roleColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color 
                      ? 'border-white scale-110' 
                      : 'border-zinc-600 hover:border-zinc-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
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
              Rol activo
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
              disabled={!formData.code || !formData.name}
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
        title="Editar Rol de Empleado"
        size="md"
      >
        {selectedRole && (
          <div className="space-y-4">
            <Input
              label="Código"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
              disabled
            />
            
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ej: Editor Senior"
            />
            
            <Textarea
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción de las responsabilidades del rol"
              rows={3}
            />
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {roleColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color 
                        ? 'border-white scale-110' 
                        : 'border-zinc-600 hover:border-zinc-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
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
                Rol activo
              </label>
            </div>
            
            {selectedRole.employeeCount > 0 && !formData.isActive && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Este rol tiene {selectedRole.employeeCount} empleado(s) asignado(s). 
                  Desactivarlo puede afectar sus permisos.
                </p>
              </div>
            )}
            
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
            ¿Estás seguro de que deseas eliminar el rol{' '}
            <span className="font-semibold text-white">
              "{selectedRole?.name}"
            </span>?
          </p>
          
          {selectedRole?.employeeCount === 0 ? (
            <p className="text-sm text-zinc-400">
              Este rol no tiene empleados asignados y se puede eliminar sin problemas.
            </p>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm">
                ❌ No se puede eliminar este rol porque tiene {selectedRole?.employeeCount} empleado(s) asignado(s).
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
              disabled={selectedRole?.employeeCount! > 0}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EmployeeRolesPage