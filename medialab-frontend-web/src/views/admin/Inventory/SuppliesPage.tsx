// src/views/admin/inventory/SuppliesPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Package,
  TrendingDown,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  ShoppingCart
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

interface Supply {
  id: string
  supplyNumber: number
  shipmentNumber: string
  receivedDate: string
  receivedBy: string
  receivedQuantity: number
  productName: string
  presentation: string
  currentStock: number
  observations?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deliveries?: SupplyDelivery[]
}

interface SupplyDelivery {
  id: string
  supplyId: string
  deliveredTo: string
  quantityDelivered: number
  deliveryDate: string
  notes?: string
  createdAt: string
}

const SuppliesPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [showSupplyModal, setShowSupplyModal] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Mock data - Supplies
  const supplies: Supply[] = [
    {
      id: '1',
      supplyNumber: 1001,
      shipmentNumber: 'SHP-2024-001',
      receivedDate: '2024-06-01',
      receivedBy: 'Ana García',
      receivedQuantity: 100,
      productName: 'Cinta de aislar eléctrica',
      presentation: 'Rollo 20m',
      currentStock: 45,
      observations: 'Cinta negra, resistente al agua',
      isActive: true,
      createdAt: '2024-06-01T10:00:00Z',
      updatedAt: '2024-06-15T14:30:00Z',
      deliveries: [
        {
          id: 'del1',
          supplyId: '1',
          deliveredTo: 'Carlos López - Proyecto Video',
          quantityDelivered: 15,
          deliveryDate: '2024-06-05',
          notes: 'Para instalación de luces en estudio',
          createdAt: '2024-06-05T09:00:00Z'
        },
        {
          id: 'del2',
          supplyId: '1',
          deliveredTo: 'María González - Mantenimiento',
          quantityDelivered: 40,
          deliveryDate: '2024-06-10',
          notes: 'Mantenimiento preventivo equipos',
          createdAt: '2024-06-10T11:30:00Z'
        }
      ]
    },
    {
      id: '2',
      supplyNumber: 1002,
      shipmentNumber: 'SHP-2024-002',
      receivedDate: '2024-06-03',
      receivedBy: 'Roberto Méndez',
      receivedQuantity: 50,
      productName: 'Duct Tape',
      presentation: 'Rollo 50m',
      currentStock: 32,
      observations: 'Color plateado, alta adherencia',
      isActive: true,
      createdAt: '2024-06-03T15:20:00Z',
      updatedAt: '2024-06-12T16:45:00Z',
      deliveries: [
        {
          id: 'del3',
          supplyId: '2',
          deliveredTo: 'Juan Pérez - Evento Graduación',
          quantityDelivered: 18,
          deliveryDate: '2024-06-08',
          notes: 'Preparación del set para evento',
          createdAt: '2024-06-08T14:20:00Z'
        }
      ]
    },
    {
      id: '3',
      supplyNumber: 1003,
      shipmentNumber: 'SHP-2024-003',
      receivedDate: '2024-06-05',
      receivedBy: 'Sofía Hernández',
      receivedQuantity: 10,
      productName: 'Cartuchos tinta impresora Canon',
      presentation: 'Set CMYK',
      currentStock: 6,
      observations: 'Compatible con Canon PIXMA series',
      isActive: true,
      createdAt: '2024-06-05T11:10:00Z',
      updatedAt: '2024-06-14T10:15:00Z',
      deliveries: [
        {
          id: 'del4',
          supplyId: '3',
          deliveredTo: 'Oficina Administración',
          quantityDelivered: 4,
          deliveryDate: '2024-06-12',
          notes: 'Reposición mensual',
          createdAt: '2024-06-12T08:45:00Z'
        }
      ]
    },
    {
      id: '4',
      supplyNumber: 1004,
      shipmentNumber: 'SHP-2024-004',
      receivedDate: '2024-06-07',
      receivedBy: 'Ana García',
      receivedQuantity: 200,
      productName: 'Lapiceros BIC azules',
      presentation: 'Caja 50 unidades',
      currentStock: 3,
      observations: 'Stock bajo - necesita reposición',
      isActive: true,
      createdAt: '2024-06-07T09:30:00Z',
      updatedAt: '2024-06-18T13:20:00Z',
      deliveries: [
        {
          id: 'del5',
          supplyId: '4',
          deliveredTo: 'Distribución general oficinas',
          quantityDelivered: 197,
          deliveryDate: '2024-06-15',
          notes: 'Distribución mensual a todas las áreas',
          createdAt: '2024-06-15T10:00:00Z'
        }
      ]
    },
    {
      id: '5',
      supplyNumber: 1005,
      shipmentNumber: 'SHP-2024-005',
      receivedDate: '2024-06-10',
      receivedBy: 'Carlos López',
      receivedQuantity: 25,
      productName: 'Cinta de seguridad amarilla',
      presentation: 'Rollo 100m',
      currentStock: 25,
      observations: 'Para señalización de áreas de trabajo',
      isActive: true,
      createdAt: '2024-06-10T16:45:00Z',
      updatedAt: '2024-06-10T16:45:00Z',
      deliveries: []
    }
  ]

  // Estadísticas
  const stats = [
    {
      title: 'Total Productos',
      value: supplies.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <Package className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Stock Bajo',
      value: supplies.filter(s => s.currentStock <= 10).length.toString(),
      change: '+25%',
      trend: 'up' as const,
      icon: <TrendingDown className="w-5 h-5 text-red-400" />
    },
    {
      title: 'Entregas Este Mes',
      value: supplies.reduce((total, supply) => 
        total + (supply.deliveries?.length || 0), 0
      ).toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <TrendingUp className="w-5 h-5 text-green-400" />
    }
  ]

  // Filtrar supplies
  const filteredSupplies = supplies.filter(supply => {
    const matchesSearch = !searchTerm || 
      supply.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supply.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supply.supplyNumber.toString().includes(searchTerm)
    
    const matchesStock = !stockFilter || 
      (stockFilter === 'low' && supply.currentStock <= 10) ||
      (stockFilter === 'medium' && supply.currentStock > 10 && supply.currentStock <= 50) ||
      (stockFilter === 'high' && supply.currentStock > 50)
    
    return matchesSearch && matchesStock
  })

  const getStockBadge = (currentStock: number, receivedQuantity: number) => {
    const percentage = (currentStock / receivedQuantity) * 100
    
    if (percentage <= 20) {
      return <Badge variant="danger">Stock Crítico</Badge>
    } else if (percentage <= 50) {
      return <Badge variant="warning">Stock Bajo</Badge>
    } else {
      return <Badge variant="success">Stock Normal</Badge>
    }
  }

  const getStockPercentage = (currentStock: number, receivedQuantity: number) => {
    return Math.round((currentStock / receivedQuantity) * 100)
  }

  const handleViewSupply = (supply: Supply) => {
    setSelectedSupply(supply)
    setShowSupplyModal(true)
  }

  const handleNewDelivery = (supply: Supply) => {
    setSelectedSupply(supply)
    setShowDeliveryModal(true)
  }

  const handleDeleteSupply = () => {
    setShowDeleteModal(false)
    setSelectedSupply(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Proveeduría
          </h1>
          <p className="text-zinc-400">
            Gestión de suministros, materiales y consumibles
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
            onClick={() => navigate('/admin/inventory/supplies/create')}
          >
            Nuevo Ingreso
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
              placeholder="Buscar por producto, número de envío..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Nivel de stock"
            value={stockFilter}
            onChange={(value) => setStockFilter(value.toString())}
            options={[
              { value: '', label: 'Todos los niveles' },
              { value: 'low', label: 'Stock Bajo (≤10)' },
              { value: 'medium', label: 'Stock Medio (11-50)' },
              { value: 'high', label: 'Stock Alto (>50)' }
            ]}
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Supplies Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Producto</TableHead>
              <TableHead>Envío</TableHead>
              <TableHead>Recibido</TableHead>
              <TableHead>Stock Actual</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Entrega</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSupplies.map((supply) => {
              const lastDelivery = supply.deliveries?.[supply.deliveries.length - 1]
              const stockPercentage = getStockPercentage(supply.currentStock, supply.receivedQuantity)
              
              return (
                <TableRow key={supply.id}>
                  <TableCell>
                    <div>
                      <h4 className="font-medium text-white">{supply.productName}</h4>
                      <p className="text-sm text-zinc-400">
                        #{supply.supplyNumber} • {supply.presentation}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                        {supply.shipmentNumber}
                      </code>
                      <p className="text-sm text-zinc-400 mt-1">
                        {new Date(supply.receivedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="text-white font-medium">{supply.receivedQuantity}</span>
                      <p className="text-sm text-zinc-400">Por: {supply.receivedBy}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{supply.currentStock}</span>
                        <span className="text-sm text-zinc-400">({stockPercentage}%)</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            stockPercentage <= 20 ? 'bg-red-500' :
                            stockPercentage <= 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockBadge(supply.currentStock, supply.receivedQuantity)}
                  </TableCell>
                  <TableCell>
                    {lastDelivery ? (
                      <div>
                        <p className="text-sm text-zinc-300">{lastDelivery.deliveredTo}</p>
                        <p className="text-xs text-zinc-500">
                          {new Date(lastDelivery.deliveryDate).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <span className="text-zinc-500 italic text-sm">Sin entregas</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye className="w-4 h-4" />}
                        onClick={() => handleViewSupply(supply)}
                      >
                        Ver
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<ShoppingCart className="w-4 h-4" />}
                        onClick={() => handleNewDelivery(supply)}
                      >
                        Entregar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit className="w-4 h-4" />}
                        onClick={() => navigate(`/admin/inventory/supplies/${supply.id}/edit`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedSupply(supply)
                          setShowDeleteModal(true)
                        }}
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

      {/* Supply Detail Modal */}
      <Modal
        isOpen={showSupplyModal}
        onClose={() => {
          setShowSupplyModal(false)
          setSelectedSupply(null)
        }}
        title="Detalles del Suministro"
        size="lg"
      >
        {selectedSupply && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedSupply.productName}
                </h3>
                <div className="flex items-center gap-3">
                  <Badge variant="info" size="sm">#{selectedSupply.supplyNumber}</Badge>
                  {getStockBadge(selectedSupply.currentStock, selectedSupply.receivedQuantity)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{selectedSupply.currentStock}</p>
                <p className="text-sm text-zinc-400">unidades disponibles</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400">Presentación</label>
                <p className="text-white font-medium">{selectedSupply.presentation}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Número de Envío</label>
                <p className="text-white font-medium">{selectedSupply.shipmentNumber}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Fecha de Recepción</label>
                <p className="text-white font-medium">
                  {new Date(selectedSupply.receivedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Recibido por</label>
                <p className="text-white font-medium">{selectedSupply.receivedBy}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Cantidad Recibida</label>
                <p className="text-white font-medium">{selectedSupply.receivedQuantity}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Stock Actual</label>
                <p className="text-white font-medium">{selectedSupply.currentStock}</p>
              </div>
            </div>

            {/* Observations */}
            {selectedSupply.observations && (
              <div>
                <label className="text-sm text-zinc-400">Observaciones</label>
                <p className="text-white bg-zinc-800/30 p-3 rounded-lg mt-1">
                  {selectedSupply.observations}
                </p>
              </div>
            )}

            {/* Delivery History */}
            <div>
              <h4 className="text-white font-medium mb-3">Historial de Entregas</h4>
              {selectedSupply.deliveries && selectedSupply.deliveries.length > 0 ? (
                <div className="space-y-3">
                  {selectedSupply.deliveries.map((delivery) => (
                    <div key={delivery.id} className="bg-zinc-800/30 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="text-white font-medium">{delivery.deliveredTo}</h5>
                          <p className="text-sm text-zinc-400">
                            {new Date(delivery.deliveryDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary" size="sm">
                          -{delivery.quantityDelivered}
                        </Badge>
                      </div>
                      {delivery.notes && (
                        <p className="text-sm text-zinc-300">{delivery.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 text-sm">No hay entregas registradas</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowSupplyModal(false)
                  setSelectedSupply(null)
                }}
              >
                Cerrar
              </Button>
              <Button 
                variant="secondary"
                leftIcon={<ShoppingCart className="w-4 h-4" />}
                onClick={() => {
                  setShowSupplyModal(false)
                  handleNewDelivery(selectedSupply)
                }}
              >
                Nueva Entrega
              </Button>
              <Button 
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowSupplyModal(false)
                  navigate(`/admin/inventory/supplies/${selectedSupply.id}/edit`)
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Delivery Modal */}
      <Modal
        isOpen={showDeliveryModal}
        onClose={() => {
          setShowDeliveryModal(false)
          setSelectedSupply(null)
        }}
        title="Nueva Entrega"
        size="md"
      >
        {selectedSupply && (
          <div className="space-y-4">
            <div className="bg-zinc-800/30 p-4 rounded-lg">
              <h4 className="text-white font-medium">{selectedSupply.productName}</h4>
              <p className="text-sm text-zinc-400">
                Stock disponible: {selectedSupply.currentStock} unidades
              </p>
            </div>
            
            <Input
              label="Entregar a"
              placeholder="Nombre de la persona o área"
            />
            
            <Input
              label="Cantidad a entregar"
              type="number"
              max={selectedSupply.currentStock}
              placeholder="0"
            />
            
            <Input
              label="Fecha de entrega"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Notas (opcional)
              </label>
              <textarea
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 resize-none"
                rows={3}
                placeholder="Motivo de la entrega, proyecto, etc..."
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowDeliveryModal(false)
                  setSelectedSupply(null)
                }}
              >
                Cancelar
              </Button>
              <Button>
                Registrar Entrega
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
            ¿Estás seguro de que deseas eliminar el suministro{' '}
            <span className="font-semibold text-white">
              "{selectedSupply?.productName}"
            </span>?
          </p>
          <p className="text-sm text-zinc-400">
            Esta acción eliminará también todo el historial de entregas.
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
              onClick={handleDeleteSupply}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SuppliesPage