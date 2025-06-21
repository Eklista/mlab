// src/views/admin/inventory/InventoryGeneralPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Monitor,
  Laptop,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Settings
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

interface InventoryType {
  id: string
  code: string
  name: string
  description: string
  color: string
  icon: string
  isActive: boolean
}

interface Equipment {
  id: string
  inventoryTypeId: string
  inventoryType: InventoryType
  assignedToUserId?: string
  assignedToUser?: string
  equipmentNumber: number
  name: string
  serviceTag: string
  ugCode: string
  processor?: string
  ramMemory?: string
  hddCapacity?: string
  monitor?: string
  serialNumber: string
  location: string
  status: 'available' | 'in-use' | 'maintenance' | 'retired' | 'damaged'
  observations?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const InventoryGeneralPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showEquipmentModal, setShowEquipmentModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data - Tipos de inventario
  const inventoryTypes: InventoryType[] = [
    {
      id: '1',
      code: 'COMP',
      name: 'Computadoras',
      description: 'Equipos de cómputo completos',
      color: '#3B82F6',
      icon: 'Monitor',
      isActive: true
    },
    {
      id: '2',
      code: 'LAPTOP',
      name: 'Laptops',
      description: 'Computadoras portátiles',
      color: '#10B981',
      icon: 'Laptop',
      isActive: true
    },
    {
      id: '3',
      code: 'CAM',
      name: 'Cámaras',
      description: 'Equipo fotográfico y video',
      color: '#F59E0B',
      icon: 'Camera',
      isActive: true
    },
    {
      id: '4',
      code: 'AUDIO',
      name: 'Audio',
      description: 'Micrófonos, grabadoras, etc.',
      color: '#8B5CF6',
      icon: 'Mic',
      isActive: true
    }
  ]

  // Mock data - Equipos
  const equipment: Equipment[] = [
    {
      id: '1',
      inventoryTypeId: '1',
      inventoryType: inventoryTypes.find(t => t.id === '1')!,
      assignedToUserId: 'user1',
      assignedToUser: 'Ana García',
      equipmentNumber: 1001,
      name: 'Computadora Dell OptiPlex',
      serviceTag: 'DL7X9K3',
      ugCode: 'UG-COMP-001',
      processor: 'Intel Core i7-11700',
      ramMemory: '16GB DDR4',
      hddCapacity: '512GB SSD',
      monitor: 'Dell 24" Full HD',
      serialNumber: 'DLL123456789',
      location: 'Oficina Principal - Estación 1',
      status: 'in-use',
      observations: 'En perfecto estado, instalado software de edición',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-06-01T15:30:00Z'
    },
    {
      id: '2',
      inventoryTypeId: '2',
      inventoryType: inventoryTypes.find(t => t.id === '2')!,
      equipmentNumber: 2001,
      name: 'MacBook Pro 16"',
      serviceTag: 'MBP-2023-01',
      ugCode: 'UG-LAP-001',
      processor: 'Apple M2 Pro',
      ramMemory: '32GB',
      hddCapacity: '1TB SSD',
      serialNumber: 'APL987654321',
      location: 'Estudio de Grabación',
      status: 'available',
      observations: 'Recién adquirido, listo para asignar',
      isActive: true,
      createdAt: '2024-03-10T14:20:00Z',
      updatedAt: '2024-06-15T09:45:00Z'
    },
    {
      id: '3',
      inventoryTypeId: '3',
      inventoryType: inventoryTypes.find(t => t.id === '3')!,
      assignedToUserId: 'user2',
      assignedToUser: 'Carlos López',
      equipmentNumber: 3001,
      name: 'Canon EOS R5',
      serviceTag: 'CN-R5-001',
      ugCode: 'UG-CAM-001',
      serialNumber: 'CN1234567890',
      location: 'Departamento Audiovisual',
      status: 'in-use',
      observations: 'Incluye lente 24-70mm f/2.8, en uso para proyecto medicina',
      isActive: true,
      createdAt: '2024-02-20T11:15:00Z',
      updatedAt: '2024-06-10T16:20:00Z'
    },
    {
      id: '4',
      inventoryTypeId: '1',
      inventoryType: inventoryTypes.find(t => t.id === '1')!,
      equipmentNumber: 1002,
      name: 'Computadora HP EliteDesk',
      serviceTag: 'HP8M4N2',
      ugCode: 'UG-COMP-002',
      processor: 'Intel Core i5-10400',
      ramMemory: '8GB DDR4',
      hddCapacity: '256GB SSD',
      monitor: 'HP 22" HD',
      serialNumber: 'HP987654321',
      location: 'Almacén',
      status: 'maintenance',
      observations: 'Requiere actualización de RAM y limpieza general',
      isActive: true,
      createdAt: '2024-01-08T09:30:00Z',
      updatedAt: '2024-06-18T14:10:00Z'
    }
  ]

  // Estadísticas
  const stats = [
    {
      title: 'Total Equipos',
      value: equipment.length.toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <Monitor className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'En Uso',
      value: equipment.filter(e => e.status === 'in-use').length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Settings className="w-5 h-5 text-green-400" />
    },
    {
      title: 'Disponibles',
      value: equipment.filter(e => e.status === 'available').length.toString(),
      change: '-5%',
      trend: 'down' as const,
      icon: <Monitor className="w-5 h-5 text-orange-400" />
    }
  ]

  // Filtrar equipos
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ugCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = !selectedType || item.inventoryTypeId === selectedType
    const matchesStatus = !selectedStatus || item.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: Equipment['status']) => {
    const variants = {
      available: 'success',
      'in-use': 'info',
      maintenance: 'warning',
      retired: 'secondary',
      damaged: 'danger'
    } as const

    const labels = {
      available: 'Disponible',
      'in-use': 'En Uso',
      maintenance: 'Mantenimiento',
      retired: 'Retirado',
      damaged: 'Dañado'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getTypeIcon = (iconName: string) => {
    const icons = {
      Monitor: <Monitor className="w-4 h-4" />,
      Laptop: <Laptop className="w-4 h-4" />,
      Camera: <Monitor className="w-4 h-4" />,
      Mic: <Monitor className="w-4 h-4" />
    }
    return icons[iconName as keyof typeof icons] || <Monitor className="w-4 h-4" />
  }

  const handleViewEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setShowEquipmentModal(true)
  }

  const handleDeleteEquipment = () => {
    setShowDeleteModal(false)
    setSelectedEquipment(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Inventario General
          </h1>
          <p className="text-zinc-400">
            Gestión de equipos y activos tecnológicos
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
            onClick={() => navigate('/admin/inventory/equipment/create')}
          >
            Nuevo Equipo
          </Button>
        </div>
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
              placeholder="Buscar por nombre, código UG, service tag, serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Tipo de equipo"
            value={selectedType}
            onChange={(value) => setSelectedType(value.toString())}
            options={[
              { value: '', label: 'Todos los tipos' },
              ...inventoryTypes.map(type => ({
                value: type.id,
                label: type.name
              }))
            ]}
          />
          <Select
            placeholder="Estado"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value.toString())}
            options={[
              { value: '', label: 'Todos los estados' },
              { value: 'available', label: 'Disponible' },
              { value: 'in-use', label: 'En Uso' },
              { value: 'maintenance', label: 'Mantenimiento' },
              { value: 'retired', label: 'Retirado' },
              { value: 'damaged', label: 'Dañado' }
            ]}
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Equipment Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Equipo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Código UG</TableHead>
              <TableHead>Service Tag</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <p className="text-sm text-zinc-400">#{item.equipmentNumber}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.inventoryType.icon)}
                    <span className="text-zinc-300">{item.inventoryType.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                    {item.ugCode}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{item.serviceTag}</span>
                </TableCell>
                <TableCell>
                  {item.assignedToUser ? (
                    <span className="text-zinc-300">{item.assignedToUser}</span>
                  ) : (
                    <span className="text-zinc-500 italic">Sin asignar</span>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(item.status)}
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{item.location}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => handleViewEquipment(item)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/inventory/equipment/${item.id}/edit`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedEquipment(item)
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

      {/* Equipment Detail Modal */}
      <Modal
        isOpen={showEquipmentModal}
        onClose={() => {
          setShowEquipmentModal(false)
          setSelectedEquipment(null)
        }}
        title="Detalles del Equipo"
        size="lg"
      >
        {selectedEquipment && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedEquipment.name}
                </h3>
                <div className="flex items-center gap-3">
                  <Badge variant="info" size="sm">#{selectedEquipment.equipmentNumber}</Badge>
                  {getStatusBadge(selectedEquipment.status)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTypeIcon(selectedEquipment.inventoryType.icon)}
                <span className="text-zinc-300">{selectedEquipment.inventoryType.name}</span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400">Código UG</label>
                <p className="text-white font-medium">{selectedEquipment.ugCode}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Service Tag</label>
                <p className="text-white font-medium">{selectedEquipment.serviceTag}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Serial Number</label>
                <p className="text-white font-medium">{selectedEquipment.serialNumber}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Ubicación</label>
                <p className="text-white font-medium">{selectedEquipment.location}</p>
              </div>
            </div>

            {/* Assignment */}
            <div>
              <label className="text-sm text-zinc-400">Asignado a</label>
              <p className="text-white font-medium">
                {selectedEquipment.assignedToUser || 'Sin asignar'}
              </p>
            </div>

            {/* Technical Specs */}
            {(selectedEquipment.processor || selectedEquipment.ramMemory || selectedEquipment.hddCapacity || selectedEquipment.monitor) && (
              <div>
                <h4 className="text-white font-medium mb-3">Especificaciones Técnicas</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedEquipment.processor && (
                    <div>
                      <label className="text-sm text-zinc-400">Procesador</label>
                      <p className="text-white">{selectedEquipment.processor}</p>
                    </div>
                  )}
                  {selectedEquipment.ramMemory && (
                    <div>
                      <label className="text-sm text-zinc-400">Memoria RAM</label>
                      <p className="text-white">{selectedEquipment.ramMemory}</p>
                    </div>
                  )}
                  {selectedEquipment.hddCapacity && (
                    <div>
                      <label className="text-sm text-zinc-400">Almacenamiento</label>
                      <p className="text-white">{selectedEquipment.hddCapacity}</p>
                    </div>
                  )}
                  {selectedEquipment.monitor && (
                    <div>
                      <label className="text-sm text-zinc-400">Monitor</label>
                      <p className="text-white">{selectedEquipment.monitor}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Observations */}
            {selectedEquipment.observations && (
              <div>
                <label className="text-sm text-zinc-400">Observaciones</label>
                <p className="text-white bg-zinc-800/30 p-3 rounded-lg mt-1">
                  {selectedEquipment.observations}
                </p>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-700/50">
              <div>
                <label className="text-sm text-zinc-400">Creado</label>
                <p className="text-zinc-300 text-sm">
                  {new Date(selectedEquipment.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Última actualización</label>
                <p className="text-zinc-300 text-sm">
                  {new Date(selectedEquipment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEquipmentModal(false)
                  setSelectedEquipment(null)
                }}
              >
                Cerrar
              </Button>
              <Button 
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowEquipmentModal(false)
                  navigate(`/admin/inventory/equipment/${selectedEquipment.id}/edit`)
                }}
              >
                Editar Equipo
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
            ¿Estás seguro de que deseas eliminar el equipo{' '}
            <span className="font-semibold text-white">
              "{selectedEquipment?.name}"
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
              onClick={handleDeleteEquipment}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default InventoryGeneralPage