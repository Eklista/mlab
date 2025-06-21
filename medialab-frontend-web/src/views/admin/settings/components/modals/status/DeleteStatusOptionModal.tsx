import { Trash2, AlertTriangle, Edit, Eye, EyeOff } from 'lucide-react'
import { Button, Modal } from '@/core/components/ui'

interface StatusOption {
  id: string
  code: string
  name: string
  color: string
  usageCount?: number
  isActive: boolean
}

interface DeleteStatusOptionModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  statusOption: StatusOption | null
  statusTypeName: string
}

const DeleteStatusOptionModal = ({ 
  isOpen, 
  onClose, 
  onDelete, 
  statusOption,
  statusTypeName 
}: DeleteStatusOptionModalProps) => {
  
  const handleDelete = () => {
    onDelete()
    onClose()
  }

  if (!statusOption) return null

  const canDelete = (statusOption.usageCount || 0) === 0
  const hasUsage = (statusOption.usageCount || 0) > 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      size="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-zinc-300">
              ¿Estás seguro de que deseas eliminar la opción de estado{' '}
              <span className="font-semibold text-white">
                "{statusOption.name}"
              </span>{' '}
              del tipo <span className="font-semibold text-white">"{statusTypeName}"</span>?
            </p>
            
            {/* Preview del estado */}
            <div className="mt-3 flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: statusOption.color }}
              >
                <span className="text-sm">🏁</span>
              </div>
              <div>
                <h5 className="font-medium text-white text-sm">
                  {statusOption.name}
                </h5>
                <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                  {statusOption.code}
                </code>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status checks */}
        <div className="space-y-2">
          {canDelete ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-300 text-sm">
                ✅ Esta opción de estado se puede eliminar sin problemas:
              </p>
              <ul className="text-green-300 text-sm mt-2 space-y-1">
                <li>• No está siendo utilizada en proyectos, tareas u otros elementos</li>
                <li>• Se eliminará permanentemente del tipo de estado</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm font-medium mb-2">
                ❌ No se puede eliminar esta opción de estado:
              </p>
              <ul className="text-red-300 text-sm space-y-1">
                {hasUsage && (
                  <li>• Está siendo utilizada en {statusOption.usageCount} elemento(s)</li>
                )}
              </ul>
              <p className="text-red-300 text-sm mt-2">
                Para eliminarla, primero debes cambiar el estado de todos los elementos que la usan.
              </p>
            </div>
          )}
        </div>

        {/* Actions to take before deletion */}
        {!canDelete && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-300 text-sm font-medium mb-2">
              💡 Pasos para poder eliminar:
            </p>
            <ol className="text-yellow-300 text-sm space-y-1 list-decimal list-inside">
              <li>Cambiar el estado de todos los elementos que usan esta opción</li>
              <li>Verificar que no esté en uso en ningún workflow</li>
              <li>Volver a intentar la eliminación</li>
            </ol>
          </div>
        )}

        {/* Alternative actions */}
        {!canDelete && (
          <div className="border-t border-zinc-700 pt-4">
            <p className="text-zinc-400 text-sm mb-3">
              Alternativas:
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onClose}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar esta opción de estado
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onClose}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver dónde se está usando
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  // Lógica para desactivar en lugar de eliminar
                  console.log('Desactivar opción de estado')
                  onClose()
                }}
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Desactivar en lugar de eliminar
              </Button>
            </div>
          </div>
        )}

        {/* Additional warning for permanent deletion */}
        {canDelete && (
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-3">
            <p className="text-gray-300 text-sm">
              ⚠️ <strong>Esta acción es permanente</strong> y no se puede deshacer. 
              La opción de estado será eliminada completamente del sistema.
            </p>
          </div>
        )}
        
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={handleDelete}
            disabled={!canDelete}
          >
            {canDelete ? 'Eliminar Permanentemente' : 'No se puede eliminar'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteStatusOptionModal