import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { Button, Modal, Input, Textarea } from '@/core/components/ui'
import type { ConfigModalProps } from './EmailConfigModal'

interface UploadsConfigModalProps extends ConfigModalProps {}

const UploadsConfigModal = ({ isOpen, onClose, configurations, onSave }: UploadsConfigModalProps) => {
  const [formData, setFormData] = useState<{[key: string]: any}>({})

  // Inicializar form data cuando se abra el modal
  useEffect(() => {
    if (isOpen && configurations.length > 0) {
      const uploadsKeys = ['MAX_FILE_SIZE_MB', 'ALLOWED_FILE_TYPES', 'UPLOAD_PATH', 'AUTO_CLEANUP_ENABLED', 'CLEANUP_DAYS']
      const initialData: {[key: string]: any} = {}
      
      uploadsKeys.forEach(key => {
        const config = configurations.find(c => c.key === key)
        if (config) {
          initialData[key] = config.type === 'boolean' ? config.value === 'true' : config.value
        }
      })
      
      setFormData(initialData)
    }
  }, [isOpen, configurations])

  const updateFormValue = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getConfigByKey = (key: string) => {
    return configurations.find(config => config.key === key)
  }

  const renderInput = (configKey: string, label: string, placeholder?: string, type?: string) => {
    const config = getConfigByKey(configKey)
    if (!config) return null

    const isBoolean = config.type === 'boolean'

    if (isBoolean) {
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={configKey}
            checked={formData[configKey] || false}
            onChange={(e) => updateFormValue(configKey, e.target.checked)}
            className="rounded border-zinc-600"
          />
          <label htmlFor={configKey} className="text-sm text-zinc-300">
            {label}
          </label>
        </div>
      )
    }

    return (
      <Input
        label={label}
        type={type || 'text'}
        value={formData[configKey] || ''}
        onChange={(e) => updateFormValue(configKey, e.target.value)}
        placeholder={placeholder}
      />
    )
  }

  const handleSave = () => {
    const uploadsData = {
      MAX_FILE_SIZE_MB: formData['MAX_FILE_SIZE_MB'],
      ALLOWED_FILE_TYPES: formData['ALLOWED_FILE_TYPES'],
      UPLOAD_PATH: formData['UPLOAD_PATH'],
      AUTO_CLEANUP_ENABLED: formData['AUTO_CLEANUP_ENABLED'],
      CLEANUP_DAYS: formData['CLEANUP_DAYS']
    }
    
    onSave(uploadsData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración de Archivos"
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <p className="text-orange-300 text-sm">
            📁 Configura los límites y reglas para la subida de archivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('MAX_FILE_SIZE_MB', 'Tamaño Máximo (MB)', '50', 'number')}
          {renderInput('UPLOAD_PATH', 'Ruta de Almacenamiento', '/var/uploads/medialab')}
        </div>

        <Textarea
          label="Tipos de Archivo Permitidos"
          value={formData['ALLOWED_FILE_TYPES'] || ''}
          onChange={(e) => updateFormValue('ALLOWED_FILE_TYPES', e.target.value)}
          placeholder="jpg,jpeg,png,gif,pdf,mp4,mov,avi,mp3,wav,zip,rar"
          helperText="Separar con comas los tipos de archivo permitidos"
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('AUTO_CLEANUP_ENABLED', 'Limpieza automática de archivos temporales')}
          {formData['AUTO_CLEANUP_ENABLED'] && renderInput('CLEANUP_DAYS', 'Días para limpieza', '30', 'number')}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Guardar Configuración
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadsConfigModal