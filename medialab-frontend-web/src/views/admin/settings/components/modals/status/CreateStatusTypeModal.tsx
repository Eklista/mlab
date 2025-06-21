import { useState } from 'react'
import { Save, Flag } from 'lucide-react'
import { Button, Modal, Input, Textarea } from '@/core/components/ui'

interface CreateStatusTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: StatusTypeFormData) => void
}

export interface StatusTypeFormData {
  code: string
  name: string
  description: string
}

const CreateStatusTypeModal = ({ isOpen, onClose, onSave }: CreateStatusTypeModalProps) => {
  const [formData, setFormData] = useState<StatusTypeFormData>({
    code: '',
    name: '',
    description: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.code.trim()) {
      newErrors['code'] = 'El código es obligatorio'
    } else if (!/^[A-Z_]+$/.test(formData.code)) {
      newErrors['code'] = 'El código debe contener solo letras mayúsculas y guiones bajos'
    }

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nuevo Tipo de Estado"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            💡 Los tipos de estado agrupan diferentes opciones de estado para proyectos, tareas, etc.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Código"
            value={formData.code}
            onChange={(e) => updateFormData('code', e.target.value.toUpperCase())}
            placeholder="ej: PROJECT_STATUS"
            {...(errors['code'] && { error: errors['code'] })}
            helperText="Código único en mayúsculas, usar guiones bajos para separar palabras"
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
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Flag className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h5 className="font-medium text-white">
                {formData.name || 'Nombre del tipo de estado'}
              </h5>
              <p className="text-sm text-zinc-400">
                {formData.description || 'Descripción del tipo de estado'}
              </p>
              <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 mt-1 inline-block">
                {formData.code || 'CODIGO_TIPO'}
              </code>
            </div>
          </div>
        </div>
        
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
            disabled={!formData.code || !formData.name || !formData.description}
          >
            Crear Tipo de Estado
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateStatusTypeModal