import { useState } from 'react'
import { Save } from 'lucide-react'
import { Button, Modal, Input, IconPicker } from '@/core/components/ui'

interface CreateStatusOptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: StatusOptionFormData) => void
  statusTypeId: string
  statusTypeName: string
  existingOptions?: StatusOptionFormData[]
}

export interface StatusOptionFormData {
  code: string
  name: string
  level: number
  color: string
  icon: string
  isActive: boolean
  sortOrder: number
}

const CreateStatusOptionModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  statusTypeId: _,
  statusTypeName,
  existingOptions = []
}: CreateStatusOptionModalProps) => {
  const [formData, setFormData] = useState<StatusOptionFormData>({
    code: '',
    name: '',
    level: 1,
    color: '#3B82F6',
    icon: 'Flag',
    isActive: true,
    sortOrder: existingOptions.length + 1
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const statusColors = [
    '#6B7280',
    '#3B82F6', 
    '#F59E0B',
    '#10B981',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16',
    '#F97316'
  ]

  const statusLevels = [
    { value: 1, label: 'Inicial', description: 'Estado de inicio del proceso' },
    { value: 2, label: 'En Proceso', description: 'Estado intermedio del proceso' },
    { value: 3, label: 'Revisión', description: 'Estado de validación o revisión' },
    { value: 4, label: 'Final', description: 'Estado final del proceso' },
    { value: 5, label: 'Especial', description: 'Estado especial o excepcional' }
  ]

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.code.trim()) {
      newErrors['code'] = 'El código es obligatorio'
    } else if (!/^[A-Z_]+$/.test(formData.code)) {
      newErrors['code'] = 'El código debe contener solo letras mayúsculas y guiones bajos'
    } else if (existingOptions.some(opt => opt.code === formData.code)) {
      newErrors['code'] = 'Este código ya existe en este tipo de estado'
    }

    if (!formData.name.trim()) {
      newErrors['name'] = 'El nombre es obligatorio'
    }

    if (formData.level < 1 || formData.level > 10) {
      newErrors['level'] = 'El nivel debe estar entre 1 y 10'
    }

    if (formData.sortOrder < 1) {
      newErrors['sortOrder'] = 'El orden debe ser mayor a 0'
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
      level: 1,
      color: '#3B82F6',
      icon: 'Flag',
      isActive: true,
      sortOrder: existingOptions.length + 1
    })
    setErrors({})
    onClose()
  }

  const updateFormData = (field: keyof StatusOptionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const getCurrentLevelInfo = () => {
    return statusLevels.find(level => level.value === formData.level)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Nueva Opción de Estado - ${statusTypeName}`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-green-300 text-sm">
            ✨ Creando una nueva opción para el tipo de estado: <strong>{statusTypeName}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Código"
            value={formData.code}
            onChange={(e) => updateFormData('code', e.target.value.toUpperCase())}
            placeholder="ej: IN_PROGRESS"
            {...(errors['code'] && { error: errors['code'] })}
            helperText="Código único dentro de este tipo de estado"
          />
          
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="ej: En Progreso"
            {...(errors['name'] && { error: errors['name'] })}
            helperText="Nombre que se mostrará en la interfaz"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Nivel de Estado
            </label>
            <select
              value={formData.level}
              onChange={(e) => updateFormData('level', parseInt(e.target.value))}
              className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-3"
            >
              {statusLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value} - {level.label}
                </option>
              ))}
            </select>
            {getCurrentLevelInfo() && (
              <p className="text-xs text-zinc-400 mt-1">
                {getCurrentLevelInfo()?.description}
              </p>
            )}
          </div>

          <Input
            label="Orden"
            type="number"
            value={formData.sortOrder.toString()}
            onChange={(e) => updateFormData('sortOrder', parseInt(e.target.value) || 1)}
            placeholder="1"
            {...(errors['sortOrder'] && { error: errors['sortOrder'] })}
            helperText="Orden de aparición en listas"
            min="1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Icono
            </label>
            <IconPicker
              value={formData.icon}
              onChange={(iconName) => updateFormData('icon', iconName)}
              placeholder="Seleccionar icono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {statusColors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateFormData('color', color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    formData.color === color 
                      ? 'border-white scale-110' 
                      : 'border-zinc-600 hover:border-zinc-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <Input
              value={formData.color}
              onChange={(e) => updateFormData('color', e.target.value)}
              placeholder="#3B82F6"
              className="mt-2"
              size="sm"
            />
          </div>
        </div>

        <div className="border border-zinc-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Vista Previa</h4>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: formData.color }}
            >
              <span className="text-sm">🏁</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-white">
                  {formData.name || 'Nombre del estado'}
                </h5>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                  Nivel {formData.level}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                {formData.code || 'CODIGO_ESTADO'} • Orden: {formData.sortOrder}
              </p>
            </div>
            <div className="ml-auto">
              {formData.isActive ? (
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Activo
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  Inactivo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActiveCreate"
            checked={formData.isActive}
            onChange={(e) => updateFormData('isActive', e.target.checked)}
            className="rounded border-zinc-600"
          />
          <label htmlFor="isActiveCreate" className="text-sm text-zinc-300">
            Estado activo
          </label>
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
            disabled={!formData.code || !formData.name}
          >
            Crear Opción
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateStatusOptionModal