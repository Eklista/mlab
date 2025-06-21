import { useState, useEffect } from 'react'
import { Save, Flag } from 'lucide-react'
import { Button, Modal, Input, Textarea } from '@/core/components/ui'
import type { StatusTypeFormData } from './CreateStatusTypeModal'

interface StatusType {
  id: string
  code: string
  name: string
  description: string
  optionsCount?: number
}

interface EditStatusTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: StatusTypeFormData) => void
  statusType: StatusType | null
}

const EditStatusTypeModal = ({ isOpen, onClose, onSave, statusType }: EditStatusTypeModalProps) => {
  const [formData, setFormData] = useState<StatusTypeFormData>({
    code: '',
    name: '',
    description: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen && statusType) {
      setFormData({
        code: statusType.code,
        name: statusType.name,
        description: statusType.description
      })
    }
  }, [isOpen, statusType])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors['name'] = 'El nombre es obligatorio'
    }

    if (!formData.description.trim()) {
      newErrors['description'] = 'La descripción es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      code: '',
      name: '',
      description: ''
    })
    setErrors({})
    onClose()
  }

  const updateFormData = (field: keyof StatusTypeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (!statusType) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Editar Tipo de Estado"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <p className="text-orange-300 text-sm">
            ✏️ Editando el tipo de estado: <strong>{statusType.name}</strong>
            {statusType.optionsCount && statusType.optionsCount > 0 && (
              <span className="block mt-1">
                Este tipo tiene {statusType.optionsCount} opción(es) de estado asociada(s).
              </span>
            )}
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Código"
            value={formData.code}
            disabled
            helperText="El código no se puede modificar una vez creado"
          />
          
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="ej: Estados de Proyecto"
            {...(errors['name'] && { error: errors['name'] })}
            helperText="Nombre descriptivo para mostrar en la interfaz"
          />
          
          <Textarea
            label="Descripción"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Descripción detallada del propósito de este tipo de estado"
            {...(errors['description'] && { error: errors['description'] })}
            rows={3}
            helperText="Explica para qué se usará este tipo de estado"
          />
        </div>

        <div className="border border-zinc-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Vista Previa</h4>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Flag className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h5 className="font-medium text-white">
                {formData.name || 'Nombre del tipo de estado'}
              </h5>
              <p className="text-sm text-zinc-400">
                {formData.description || 'Descripción del tipo de estado'}
              </p>
              <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 mt-1 inline-block">
                {formData.code}
              </code>
            </div>
          </div>
        </div>

        {statusType.optionsCount && statusType.optionsCount > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              ⚠️ Ten en cuenta que los cambios en el nombre y descripción se reflejarán en todas las opciones de estado asociadas.
            </p>
          </div>
        )}
        
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button 
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            disabled={!formData.name || !formData.description}
          >
            Actualizar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditStatusTypeModal