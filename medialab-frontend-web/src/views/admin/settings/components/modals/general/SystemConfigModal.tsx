import { useState, useEffect } from 'react'
import { Save, AlertTriangle } from 'lucide-react'
import { Button, Modal, Input } from '@/core/components/ui'
import type { ConfigModalProps } from './EmailConfigModal'

interface SystemConfigModalProps extends ConfigModalProps {}

const SystemConfigModal = ({ isOpen, onClose, configurations, onSave }: SystemConfigModalProps) => {
  const [formData, setFormData] = useState<{[key: string]: any}>({})

  // Inicializar form data cuando se abra el modal
  useEffect(() => {
    if (isOpen && configurations.length > 0) {
      const systemKeys = ['APP_NAME', 'APP_VERSION', 'SESSION_TIMEOUT_MINUTES', 'MAINTENANCE_MODE', 'DEBUG_ENABLED']
      const initialData: {[key: string]: any} = {}
      
      systemKeys.forEach(key => {
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
    const systemData = {
      APP_NAME: formData['APP_NAME'],
      APP_VERSION: formData['APP_VERSION'],
      SESSION_TIMEOUT_MINUTES: formData['SESSION_TIMEOUT_MINUTES'],
      MAINTENANCE_MODE: formData['MAINTENANCE_MODE'],
      DEBUG_ENABLED: formData['DEBUG_ENABLED']
    }
    
    onSave(systemData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración del Sistema"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <p className="text-orange-300 text-sm">
            ⚙️ Configuración general del sistema y aplicación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('APP_NAME', 'Nombre de la Aplicación', 'Medialab CRM')}
          {renderInput('APP_VERSION', 'Versión', '1.0.0')}
        </div>

        {renderInput('SESSION_TIMEOUT_MINUTES', 'Tiempo de expiración de sesión (minutos)', '60', 'number')}

        <div className="space-y-3">
          {renderInput('MAINTENANCE_MODE', 'Modo mantenimiento (bloquea acceso a usuarios)')}
          {renderInput('DEBUG_ENABLED', 'Habilitar modo debug (logs detallados)')}
        </div>

        {formData['MAINTENANCE_MODE'] && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-red-300 text-sm">
                El modo mantenimiento bloqueará el acceso a todos los usuarios excepto administradores.
              </p>
            </div>
          </div>
        )}

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

export default SystemConfigModal