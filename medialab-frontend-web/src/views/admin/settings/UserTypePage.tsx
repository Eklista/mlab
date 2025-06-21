import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Monitor,
  UserCheck
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
} from '@/core/components/ui'
import type { SelectOption } from '@/core/components/ui'

interface UserType {
  id: string
  code: string
  name: string
  description: string
  dashboardType: 'admin' | 'client' | 'employee'
  permissions: string[]
  isActive: boolean
  userCount: number
  createdAt: string
  updatedAt: string
}

const UserTypesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    dashboardType: 'client' as 'admin' | 'client' | 'employee',
    permissions: [] as string[],
    isActive: true
  })

  // Mock data - Tipos de usuario
  const userTypes: UserType[] = [
    {
      id: '1',
      code: 'ADMIN',
      name: 'Administrador',
      description: 'Acceso completo al sistema, puede gestionar todos los módulos',
      dashboardType: 'admin',
      permissions: ['projects.create', 'projects.edit', 'projects.delete', 'users.manage', 'settings.manage'],
      isActive: true,
      userCount: 3,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-06-01T15:30:00Z'
    },
    {
      id: '2',
      code: 'CLIENT_FACULTY',
      name: 'Cliente - Facultad',
      description: 'Facultades que solicitan servicios audiovisuales',
      dashboardType: 'client',
      permissions: ['projects.view', 'requests.create', 'requests.view'],
      isActive: true,
      userCount: 12,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-05-15T11:20:00Z'
    },
    {
      id: '3',
      code: 'CLIENT_DEPARTMENT',
      name: 'Cliente - Departamento',
      description: 'Departamentos académicos que requieren contenido audiovisual',
      dashboardType: 'client',
      permissions: ['projects.view', 'requests.create', 'requests.view'],
      isActive: true,
      userCount: 8,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-04-20T14:45:00Z'
    },
    {
      id: '4',
      code: 'EMPLOYEE_PROD',
      name: 'Empleado - Producción',
      description: 'Personal de producción audiovisual del Medialab',
      dashboardType: 'employee',
      permissions: ['projects.view', 'projects.edit', 'tasks.manage', 'inventory.view'],
      isActive: true,
      userCount: 6,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-03-10T09:30:00Z'
    },
    {
      id: '5',
      code: 'CLIENT_EXTERNAL',
      name: 'Cliente Externo',
      description: 'Entidades externas que contratan servicios específicos',
      dashboardType: 'client',
      permissions: ['projects.view', 'requests.create'],
      isActive: true,
      userCount: 2,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-02-15T16:10:00Z'
    },
    {
      id: '6',
      code: 'EMPLOYEE_TECH',
      name: 'Empleado - Técnico',
      description: 'Personal técnico especializado en equipos y soporte',
      dashboardType: 'employee',
      permissions: ['inventory.manage', 'projects.view', 'equipment.manage'],
      isActive: true,
      userCount: 2,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-25T13:40:00Z'
    },
    {
      id: '7',
      code: 'GUEST_OLD',
      name: 'Invitado (Obsoleto)',
      description: 'Tipo de usuario obsoleto - migrado a otros tipos',
      dashboardType: 'client',
      permissions: [],
      isActive: false,
      userCount: 0,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-05-01T10:00:00Z'
    }
  ]

  // Opciones para dashboard type
  const dashboardTypeOptions: SelectOption[] = [
    { value: 'admin', label: 'Dashboard Administrador', description: 'Acceso completo al sistema' },
    { value: 'client', label: 'Dashboard Cliente', description: 'Vista para clientes y solicitudes' },
    { value: 'employee', label: 'Dashboard Empleado', description: 'Vista para personal interno' }
  ]

  // Permisos disponibles
  const availablePermissions = [
    { id: 'projects.view', name: 'Ver Proyectos', category: 'Proyectos' },
    { id: 'projects.create', name: 'Crear Proyectos', category: 'Proyectos' },
    { id: 'projects.edit', name: 'Editar Proyectos', category: 'Proyectos' },
    { id: 'projects.delete', name: 'Eliminar Proyectos', category: 'Proyectos' },
    { id: 'requests.view', name: 'Ver Solicitudes', category: 'Solicitudes' },
    { id: 'requests.create', name: 'Crear Solicitudes', category: 'Solicitudes' },
    { id: 'requests.manage', name: 'Gestionar Solicitudes', category: 'Solicitudes' },
    { id: 'users.view', name: 'Ver Usuarios', category: 'Usuarios' },
    { id: 'users.manage', name: 'Gestionar Usuarios', category: 'Usuarios' },
    { id: 'inventory.view', name: 'Ver Inventario', category: 'Inventario' },
    { id: 'inventory.manage', name: 'Gestionar Inventario', category: 'Inventario' },
    { id: 'equipment.manage', name: 'Gestionar Equipos', category: 'Equipos' },
    { id: 'tasks.view', name: 'Ver Tareas', category: 'Tareas' },
    { id: 'tasks.manage', name: 'Gestionar Tareas', category: 'Tareas' },
    { id: 'settings.view', name: 'Ver Configuraciones', category: 'Sistema' },
    { id: 'settings.manage', name: 'Gestionar Configuraciones', category: 'Sistema' },
    { id: 'reports.view', name: 'Ver Reportes', category: 'Reportes' },
    { id: 'reports.create', name: 'Crear Reportes', category: 'Reportes' }
  ]

  // Filtrar tipos de usuario
  const filteredUserTypes = userTypes.filter(userType => {
    const matchesSearch = !searchTerm || 
      userType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userType.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesActive = !showActiveOnly || userType.isActive
    
    return matchesSearch && matchesActive
  })

  const getDashboardIcon = (type: string) => {
    switch (type) {
      case 'admin': return <Shield className="w-4 h-4" />
      case 'employee': return <Monitor className="w-4 h-4" />
      case 'client': return <UserCheck className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getDashboardBadge = (type: string) => {
    const variants = {
      admin: 'danger' as const,
      employee: 'warning' as const,
      client: 'info' as const
    }
    
    const labels = {
      admin: 'Administrador',
      employee: 'Empleado',
      client: 'Cliente'
    }

    return (
      <Badge variant={variants[type as keyof typeof variants] || 'default'} size="sm">
        {getDashboardIcon(type)}
        <span className="ml-1">{labels[type as keyof typeof labels] || 'Desconocido'}</span>
      </Badge>
    )
  }

  const handleCreate = () => {
    console.log('Crear tipo de usuario:', formData)
    setShowCreateModal(false)
    resetForm()
  }

  const handleEdit = (userType: UserType) => {
    setSelectedUserType(userType)
    setFormData({
      code: userType.code,
      name: userType.name,
      description: userType.description,
      dashboardType: userType.dashboardType,
      permissions: userType.permissions,
      isActive: userType.isActive
    })
    setShowEditModal(true)
  }

  const handleUpdate = () => {
    console.log('Actualizar tipo de usuario:', selectedUserType?.id, formData)
    setShowEditModal(false)
    setSelectedUserType(null)
    resetForm()
  }

  const handleDelete = () => {
    console.log('Eliminar tipo de usuario:', selectedUserType?.id)
    setShowDeleteModal(false)
    setSelectedUserType(null)
  }

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      dashboardType: 'client',
      permissions: [],
      isActive: true
    })
  }

  const toggleStatus = (userType: UserType) => {
    console.log('Toggle status:', userType.id, !userType.isActive)
  }

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  // Agrupar permisos por categoría
  const groupedPermissions = availablePermissions.reduce((groups, permission) => {
    const category = permission.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(permission)
    return groups
  }, {} as Record<string, typeof availablePermissions>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Tipos de Usuario
          </h1>
          <p className="text-zinc-400">
            Configuración de tipos de usuario y sus permisos en el sistema
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowCreateModal(true)}
        >
          Nuevo Tipo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {userTypes.filter(t => t.isActive).length}
              </p>
              <p className="text-sm text-zinc-400">Tipos Activos</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {userTypes.reduce((sum, type) => sum + type.userCount, 0)}
              </p>
              <p className="text-sm text-zinc-400">Usuarios Asignados</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {userTypes.filter(t => t.dashboardType === 'admin').length}
              </p>
              <p className="text-sm text-zinc-400">Tipos Admin</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Monitor className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {userTypes.filter(t => t.dashboardType === 'client').length}
              </p>
              <p className="text-sm text-zinc-400">Tipos Cliente</p>
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

      {/* User Types Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Tipo de Usuario</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Dashboard</TableHead>
              <TableHead>Usuarios</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserTypes.map((userType) => (
              <TableRow key={userType.id}>
                <TableCell>
                  <div>
                    <h4 className="font-medium text-white">
                      {userType.name}
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      {userType.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                    {userType.code}
                  </code>
                </TableCell>
                <TableCell>
                  {getDashboardBadge(userType.dashboardType)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <span className="text-white font-medium">{userType.userCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-zinc-400" />
                    <span className="text-white font-medium">{userType.permissions.length}</span>
                    <span className="text-zinc-400 text-sm">permisos</span>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleStatus(userType)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {userType.isActive ? (
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
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => handleEdit(userType)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedUserType(userType)
                        setShowDeleteModal(true)
                      }}
                      disabled={userType.userCount > 0}
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
        title="Nuevo Tipo de Usuario"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Código"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
              placeholder="ej: CLIENT_DEPT"
            />
            
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ej: Cliente - Departamento"
            />
          </div>
          
          <Textarea
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descripción del tipo de usuario y sus responsabilidades"
            rows={3}
          />

          <Select
            label="Tipo de Dashboard"
            value={formData.dashboardType}
            onChange={(value) => setFormData(prev => ({ ...prev, dashboardType: value as any }))}
            options={dashboardTypeOptions}
          />

          {/* Permisos */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Permisos del Usuario
            </label>
            <div className="space-y-4 max-h-64 overflow-y-auto border border-zinc-700 rounded-lg p-4">
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-white mb-2">{category}</h4>
                  <div className="space-y-2 pl-4">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="rounded border-zinc-600"
                        />
                        <label htmlFor={permission.id} className="text-sm text-zinc-300">
                          {permission.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
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
              Tipo de usuario activo
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
        title="Editar Tipo de Usuario"
        size="lg"
      >
        {selectedUserType && (
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
                placeholder="ej: Cliente - Departamento"
              />
            </div>
            
            <Textarea
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del tipo de usuario y sus responsabilidades"
              rows={3}
            />

            <Select
              label="Tipo de Dashboard"
              value={formData.dashboardType}
              onChange={(value) => setFormData(prev => ({ ...prev, dashboardType: value as any }))}
              options={dashboardTypeOptions}
            />

            {/* Permisos */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Permisos del Usuario
              </label>
              <div className="space-y-4 max-h-64 overflow-y-auto border border-zinc-700 rounded-lg p-4">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-white mb-2">{category}</h4>
                    <div className="space-y-2 pl-4">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`edit_${permission.id}`}
                            checked={formData.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            className="rounded border-zinc-600"
                          />
                          <label htmlFor={`edit_${permission.id}`} className="text-sm text-zinc-300">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
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
                Tipo de usuario activo
              </label>
            </div>
            
            {selectedUserType.userCount > 0 && !formData.isActive && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Este tipo tiene {selectedUserType.userCount} usuario(s) asignado(s). 
                  Desactivarlo puede afectar su acceso al sistema.
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
            ¿Estás seguro de que deseas eliminar el tipo de usuario{' '}
            <span className="font-semibold text-white">
              "{selectedUserType?.name}"
            </span>?
          </p>
          
          {selectedUserType?.userCount === 0 ? (
            <p className="text-sm text-zinc-400">
              Este tipo no tiene usuarios asignados y se puede eliminar sin problemas.
            </p>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm">
                ❌ No se puede eliminar este tipo porque tiene {selectedUserType?.userCount} usuario(s) asignado(s).
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
              disabled={selectedUserType?.userCount! > 0}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserTypesPage