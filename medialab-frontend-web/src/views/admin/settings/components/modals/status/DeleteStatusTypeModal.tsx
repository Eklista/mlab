import { Trash2, AlertTriangle, Edit, Eye } from 'lucide-react'
import { Button, Modal } from '@/core/components/ui'

interface StatusType {
  id: string
  code: string
  name: string
  optionsCount?: number
  usageCount?: number
}

interface DeleteStatusTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  statusType: StatusType | null
}

const DeleteStatusTypeModal = ({ isOpen, onClose, onDelete, statusType }: DeleteStatusTypeModalProps) => {
  
  const handleDelete = () => {
    onDelete()
    onClose()
  }

  if (!statusType) return null

  const canDelete = (statusType.optionsCount || 0) === 0 && (statusType.usageCount || 0) === 0
  const hasOptions = (statusType.optionsCount || 0) > 0
  const hasUsage = (statusType.usageCount || 0) > 0

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
              ¿Estás seguro de que deseas eliminar el tipo de estado{' '}
              <span className="font-semibold text-white">
                "{statusType.name}"
              </span>?
            </p>
            <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 mt-2 inline-block">
              {statusType.code}
            </code>
          </div>
        </div>
        
        {/* Status checks */}
        <div className="space-y-2">
          {canDelete ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-300 text-sm">
                ✅ Este tipo de estado se puede eliminar sin problemas:
              </p>
              <ul className="text-green-300 text-sm mt-2 space-y-1">
                <li>• No tiene opciones de estado asociadas</li>
                <li>• No está siendo utilizado en proyectos o tareas</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm font-medium mb-2">
                ❌ No se puede eliminar este tipo de estado:
              </p>
              <ul className="text-red-300 text-sm space-y-1">
                {hasOptions && (
                  <li>• Tiene {statusType.optionsCount} opción(es) de estado asociada(s)</li>
                )}
                {hasUsage && (
                  <li>• Está siendo utilizado en {statusType.usageCount} elemento(s)</li>
                )}
              </ul>
              <p className="text-red-300 text-sm mt-2">
                Para eliminarlo, primero debes eliminar todas sus opciones de estado y asegurarte de que no esté en uso.
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
              {hasOptions && (
                <li>Eliminar todas las opciones de estado asociadas</li>
              )}
              {hasUsage && (
                <li>Cambiar el estado de todos los elementos que lo usan</li>
              )}
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
                Editar este tipo de estado
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onClose}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver opciones de estado asociadas
              </Button>
            </div>
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
            {canDelete ? 'Eliminar' : 'No se puede eliminar'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteStatusTypeModal