// src/views/admin/users/UsersManagementPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Building,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  UserCheck,
  Crown,
  Mail,
  Phone,
  Calendar
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

interface UserType {
  id: string
  code: string
  name: string
  description: string
  dashboardType: 'admin' | 'client'
  permissions: string[]
  isActive: boolean
}

interface EmployeeRole {
  id: string
  code: string
  name: string
  description: string
  color: string
  isActive: boolean
}

interface Unit {
  id: string
  name: string
  abbreviation: string
  deanDirector: string
  extension?: string
  email?: string
  location?: string
  description?: string
  isActive: boolean
}

interface User {
  id: string
  name: string
  email: string
  userTypeId: string
  userType: UserType
  unitId: string
  unit: Unit
  employeeRoleId?: string
  employeeRole?: EmployeeRole
  employeeCode?: string
  position?: string
  isInternal: boolean
  specialties?: string[]
  phone?: string
  avatarUrl?: string
  hireDate?: string
  lastLogin?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

type UserTab = 'internal' | 'external' | 'admins'

const UsersManagementPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<UserTab>('internal')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data - User Types
  const userTypes: UserType[] = [
    {
      id: '1',
      code: 'ADMIN',
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      dashboardType: 'admin',
      permissions: ['all'],
      isActive: true
    },
    {
      id: '2',
      code: 'CLIENT',
      name: 'Cliente',
      description: 'Acceso limitado para clientes',
      dashboardType: 'client',
      permissions: ['view_projects', 'create_requests'],
      isActive: true
    },
    {
      id: '3',
      code: 'STAFF',
      name: 'Personal',
      description: 'Personal interno del departamento',
      dashboardType: 'admin',
      permissions: ['manage_projects', 'manage_inventory'],
      isActive: true
    }
  ]

  // Mock data - Employee Roles
  const employeeRoles: EmployeeRole[] = [
    {
      id: '1',
      code: 'DIRECTOR',
      name: 'Director',
      description: 'Director del departamento',
      color: '#8B5CF6',
      isActive: true
    },
    {
      id: '2',
      code: 'COORD_PROD',
      name: 'Coordinador de Producción',
      description: 'Responsable de proyectos audiovisuales',
      color: '#3B82F6',
      isActive: true
    },
    {
      id: '3',
      code: 'EDITOR',
      name: 'Editor',
      description: 'Especialista en edición de video',
      color: '#10B981',
      isActive: true
    },
    {
      id: '4',
      code: 'CAMAROGRAFO',
      name: 'Camarógrafo',
      description: 'Operador de cámara y equipos',
      color: '#F59E0B',
      isActive: true
    },
    {
      id: '5',
      code: 'TECNICO',
      name: 'Técnico',
      description: 'Soporte técnico y mantenimiento',
      color: '#EF4444',
      isActive: true
    }
  ]

  // Mock data - Units
  const units: Unit[] = [
    {
      id: '1',
      name: 'Medialab',
      abbreviation: 'ML',
      deanDirector: 'Dr. Roberto Silva',
      extension: '1234',
      email: 'medialab@galileo.edu',
      location: 'Torre I, Piso 5',
      description: 'Departamento de producción audiovisual',
      isActive: true
    },
    {
      id: '2',
      name: 'Facultad de Ingeniería en Sistemas, Informática y Ciencias de la Computación',
      abbreviation: 'FISSIC',
      deanDirector: 'Dr. Miguel Morales',
      extension: '2000',
      email: 'fissic@galileo.edu',
      location: 'Torre II, Piso 3',
      description: 'Facultad de tecnología e informática',
      isActive: true
    },
    {
      id: '3',
      name: 'Instituto de Investigación y Desarrollo Académico',
      abbreviation: 'IDEA',
      deanDirector: 'Dra. Ana Martínez',
      extension: '3000',
      email: 'idea@galileo.edu',
      location: 'Torre III, Piso 2',
      description: 'Instituto de investigación académica',
      isActive: true
    },
    {
      id: '4',
      name: 'Facultad de Medicina',
      abbreviation: 'MED',
      deanDirector: 'Dr. Carlos López',
      extension: '4000',
      email: 'medicina@galileo.edu',
      location: 'Edificio Medicina',
      description: 'Facultad de ciencias médicas',
      isActive: true
    }
  ]

  // Mock data - Users
  const users: User[] = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana.garcia@galileo.edu',
      userTypeId: '3',
      userType: userTypes.find(t => t.id === '3')!,
      unitId: '1',
      unit: units.find(u => u.id === '1')!,
      employeeRoleId: '2',
      employeeRole: employeeRoles.find(r => r.id === '2')!,
      employeeCode: 'ML-001',
      position: 'Coordinadora de Producción',
      isInternal: true,
      specialties: ['Edición de Video', 'Dirección'],
      phone: '+502 1234-5678',
      hireDate: '2023-01-15',
      lastLogin: '2024-06-20T09:30:00Z',
      isActive: true,
      emailVerified: true,
      createdAt: '2023-01-15T10:00:00Z',
      updatedAt: '2024-06-20T09:30:00Z'
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos.lopez@galileo.edu',
      userTypeId: '3',
      userType: userTypes.find(t => t.id === '3')!,
      unitId: '1',
      unit: units.find(u => u.id === '1')!,
      employeeRoleId: '4',
      employeeRole: employeeRoles.find(r => r.id === '4')!,
      employeeCode: 'ML-002',
      position: 'Camarógrafo Senior',
      isInternal: true,
      specialties: ['Fotografía', 'Operación de Cámara'],
      phone: '+502 2345-6789',
      hireDate: '2023-03-01',
      lastLogin: '2024-06-19T15:45:00Z',
      isActive: true,
      emailVerified: true,
      createdAt: '2023-03-01T08:00:00Z',
      updatedAt: '2024-06-19T15:45:00Z'
    },
    {
      id: '3',
      name: 'Dr. Miguel Morales',
      email: 'miguel.morales@galileo.edu',
      userTypeId: '2',
      userType: userTypes.find(t => t.id === '2')!,
      unitId: '2',
      unit: units.find(u => u.id === '2')!,
      position: 'Decano FISSIC',
      isInternal: false,
      phone: '+502 3456-7890',
      lastLogin: '2024-06-18T11:20:00Z',
      isActive: true,
      emailVerified: true,
      createdAt: '2023-08-01T10:00:00Z',
      updatedAt: '2024-06-18T11:20:00Z'
    },
    {
      id: '4',
      name: 'Roberto Silva',
      email: 'roberto.silva@galileo.edu',
      userTypeId: '1',
      userType: userTypes.find(t => t.id === '1')!,
      unitId: '1',
      unit: units.find(u => u.id === '1')!,
      employeeRoleId: '1',
      employeeRole: employeeRoles.find(r => r.id === '1')!,
      employeeCode: 'ML-000',
      position: 'Director Medialab',
      isInternal: true,
      phone: '+502 4567-8901',
      hireDate: '2022-01-01',
      lastLogin: '2024-06-20T14:15:00Z',
      isActive: true,
      emailVerified: true,
      createdAt: '2022-01-01T09:00:00Z',
      updatedAt: '2024-06-20T14:15:00Z'
    },
    {
      id: '5',
      name: 'Dra. Ana Martínez',
      email: 'ana.martinez@galileo.edu',
      userTypeId: '2',
      userType: userTypes.find(t => t.id === '2')!,
      unitId: '3',
      unit: units.find(u => u.id === '3')!,
      position: 'Directora IDEA',
      isInternal: false,
      phone: '+502 5678-9012',
      lastLogin: '2024-06-15T16:30:00Z',
      isActive: true,
      emailVerified: true,
      createdAt: '2023-09-15T10:00:00Z',
      updatedAt: '2024-06-15T16:30:00Z'
    }
  ]

  // Filtrar usuarios por pestaña activa
  const getFilteredUsers = () => {
    let filteredByTab = users

    // Filtrar por pestaña
    switch (activeTab) {
      case 'internal':
        filteredByTab = users.filter(user => user.isInternal)
        break
      case 'external':
        filteredByTab = users.filter(user => !user.isInternal)
        break
      case 'admins':
        filteredByTab = users.filter(user => user.userType.code === 'ADMIN')
        break
    }

    // Aplicar filtros adicionales
    return filteredByTab.filter(user => {
      const matchesSearch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesUnit = !selectedUnit || user.unitId === selectedUnit
      const matchesRole = !selectedRole || user.employeeRoleId === selectedRole
      
      return matchesSearch && matchesUnit && matchesRole
    })
  }

  const filteredUsers = getFilteredUsers()

  // Contadores para las pestañas
  const tabCounts = {
    internal: users.filter(user => user.isInternal).length,
    external: users.filter(user => !user.isInternal).length,
    admins: users.filter(user => user.userType.code === 'ADMIN').length
  }

  // Estadísticas
  const stats = [
    {
      title: 'Total Usuarios',
      value: users.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Personal Interno',
      value: tabCounts.internal.toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <Building className="w-5 h-5 text-green-400" />
    },
    {
      title: 'Usuarios Activos',
      value: users.filter(u => u.isActive).length.toString(),
      change: '+5%',
      trend: 'up' as const,
      icon: <UserCheck className="w-5 h-5 text-purple-400" />
    }
  ]

  const getUserTypeBadge = (userType: UserType) => {
    const variants = {
      ADMIN: 'danger',
      CLIENT: 'info',
      STAFF: 'secondary'
    } as const

    return (
      <Badge variant={variants[userType.code as keyof typeof variants] || 'secondary'}>
        {userType.name}
      </Badge>
    )
  }

  const getStatusBadge = (isActive: boolean, emailVerified: boolean) => {
    if (!isActive) {
      return <Badge variant="secondary">Inactivo</Badge>
    }
    if (!emailVerified) {
      return <Badge variant="warning">Sin Verificar</Badge>
    }
    return <Badge variant="success">Activo</Badge>
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleDeleteUser = () => {
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const getTabIcon = (tab: UserTab) => {
    const icons = {
      internal: <Building className="w-4 h-4" />,
      external: <Users className="w-4 h-4" />,
      admins: <Crown className="w-4 h-4" />
    }
    return icons[tab]
  }

  const getTabLabel = (tab: UserTab) => {
    const labels = {
      internal: 'Personal Interno',
      external: 'Usuarios Externos', 
      admins: 'Administradores'
    }
    return labels[tab]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestión de Usuarios
          </h1>
          <p className="text-zinc-400">
            Administración de personal, clientes y permisos del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Exportar
          </Button>
          <Button 
            variant="outline"
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Importar
          </Button>
          <Button 
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/admin/users/create')}
          >
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-zinc-700/50">
          <div className="flex space-x-8">
            {(['internal', 'external', 'admins'] as UserTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-300'
                }`}
              >
                {getTabIcon(tab)}
                {getTabLabel(tab)}
                <Badge variant="secondary" size="sm">
                  {tabCounts[tab]}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre, email o código de empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Unidad"
            value={selectedUnit}
            onChange={(value) => setSelectedUnit(value.toString())}
            options={[
              { value: '', label: 'Todas las unidades' },
              ...units.map(unit => ({
                value: unit.id,
                label: `${unit.name} (${unit.abbreviation})`
              }))
            ]}
          />
          {activeTab === 'internal' && (
            <Select
              placeholder="Rol"
              value={selectedRole}
              onChange={(value) => setSelectedRole(value.toString())}
              options={[
                { value: '', label: 'Todos los roles' },
                ...employeeRoles.map(role => ({
                  value: role.id,
                  label: role.name
                }))
              ]}
            />
          )}
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Usuario</TableHead>
              <TableHead>Unidad</TableHead>
              {activeTab === 'internal' && <TableHead>Rol</TableHead>}
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-zinc-900">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{user.name}</h4>
                      <p className="text-sm text-zinc-400">{user.email}</p>
                      {user.employeeCode && (
                        <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-400">
                          {user.employeeCode}
                        </code>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="text-white font-medium">{user.unit.abbreviation}</span>
                    <p className="text-sm text-zinc-400">{user.unit.name}</p>
                  </div>
                </TableCell>
                {activeTab === 'internal' && (
                  <TableCell>
                    {user.employeeRole ? (
                      <Badge 
                        variant="secondary" 
                        size="sm"
                        style={{ backgroundColor: `${user.employeeRole.color}20`, color: user.employeeRole.color }}
                      >
                        {user.employeeRole.name}
                      </Badge>
                    ) : (
                      <span className="text-zinc-500 italic text-sm">Sin rol</span>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  {getUserTypeBadge(user.userType)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.isActive, user.emailVerified)}
                </TableCell>
                <TableCell>
                  {user.lastLogin ? (
                    <span className="text-zinc-300 text-sm">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-zinc-500 italic text-sm">Nunca</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => handleViewUser(user)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedUser(user)
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

      {/* User Detail Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false)
          setSelectedUser(null)
        }}
        title="Detalles del Usuario"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-zinc-900">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                  <p className="text-zinc-400">{selectedUser.position || 'Sin cargo definido'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getUserTypeBadge(selectedUser.userType)}
                    {getStatusBadge(selectedUser.isActive, selectedUser.emailVerified)}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </label>
                <p className="text-white font-medium">{selectedUser.email}</p>
              </div>
              {selectedUser.phone && (
                <div>
                  <label className="text-sm text-zinc-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Teléfono
                  </label>
                  <p className="text-white font-medium">{selectedUser.phone}</p>
                </div>
              )}
            </div>

            {/* Unit & Role Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400 flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  Unidad
                </label>
                <p className="text-white font-medium">{selectedUser.unit.name}</p>
                <p className="text-sm text-zinc-400">{selectedUser.unit.abbreviation}</p>
              </div>
              {selectedUser.employeeRole && (
                <div>
                  <label className="text-sm text-zinc-400">Rol de Empleado</label>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      style={{ backgroundColor: `${selectedUser.employeeRole.color}20`, color: selectedUser.employeeRole.color }}
                    >
                      {selectedUser.employeeRole.name}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Employee Info (for internal users) */}
            {selectedUser.isInternal && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUser.employeeCode && (
                  <div>
                    <label className="text-sm text-zinc-400">Código de Empleado</label>
                    <code className="text-white bg-zinc-800/30 px-2 py-1 rounded block w-fit">
                      {selectedUser.employeeCode}
                    </code>
                  </div>
                )}
                {selectedUser.hireDate && (
                  <div>
                    <label className="text-sm text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Fecha de Contratación
                    </label>
                    <p className="text-white font-medium">
                      {new Date(selectedUser.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Specialties */}
            {selectedUser.specialties && selectedUser.specialties.length > 0 && (
              <div>
                <label className="text-sm text-zinc-400">Especialidades</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedUser.specialties.map((specialty, index) => (
                    <Badge key={index} variant="info" size="sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Access Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-700/50">
              <div>
                <label className="text-sm text-zinc-400">Último Acceso</label>
                <p className="text-zinc-300">
                  {selectedUser.lastLogin 
                    ? new Date(selectedUser.lastLogin).toLocaleString()
                    : 'Nunca ha ingresado'
                  }
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Miembro Desde</label>
                <p className="text-zinc-300">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowUserModal(false)
                  setSelectedUser(null)
                }}
              >
                Cerrar
              </Button>
              <Button 
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowUserModal(false)
                  navigate(`/admin/users/${selectedUser.id}/edit`)
                }}
              >
                Editar Usuario
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
            ¿Estás seguro de que deseas eliminar al usuario{' '}
            <span className="font-semibold text-white">
              "{selectedUser?.name}"
            </span>?
          </p>
          <p className="text-sm text-zinc-400">
            Esta acción no se puede deshacer y eliminará todos los datos asociados.
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
              onClick={handleDeleteUser}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UsersManagementPage