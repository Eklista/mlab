import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { Button, Modal, Input } from '@/core/components/ui'
import type { ConfigModalProps } from './EmailConfigModal'

interface BackupConfigModalProps extends ConfigModalProps {}

const BackupConfigModal = ({ isOpen, onClose, configurations, onSave }: BackupConfigModalProps) => {
  const [formData, setFormData] = useState<{[key: string]: any}>({})

  // Inicializar form data cuando se abra el modal
  useEffect(() => {
    if (isOpen && configurations.length > 0) {
      const backupKeys = ['BACKUP_ENABLED', 'BACKUP_FREQUENCY', 'BACKUP_RETENTION_DAYS', 'BACKUP_STORAGE_PATH', 'BACKUP_AUTO_CLEANUP']
      const initialData: {[key: string]: any} = {}
      
      backupKeys.forEach(key => {
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
    const backupData = {
      BACKUP_ENABLED: formData['BACKUP_ENABLED'],
      BACKUP_FREQUENCY: formData['BACKUP_FREQUENCY'],
      BACKUP_RETENTION_DAYS: formData['BACKUP_RETENTION_DAYS'],
      BACKUP_STORAGE_PATH: formData['BACKUP_STORAGE_PATH'],
      BACKUP_AUTO_CLEANUP: formData['BACKUP_AUTO_CLEANUP']
    }
    
    onSave(backupData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración de Respaldos"
      size="md"
    >
      <div className="space-y-6">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
          <p className="text-indigo-300 text-sm">
            🛡️ Configuración de respaldos automáticos del sistema
          </p>
        </div>

        {renderInput('BACKUP_ENABLED', 'Habilitar respaldos automáticos')}

        {formData['BACKUP_ENABLED'] && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Frecuencia
                </label>
                <select
                  value={formData['BACKUP_FREQUENCY'] || 'daily'}
                  onChange={(e) => updateFormValue('BACKUP_FREQUENCY', e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-3"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
              
              {renderInput('BACKUP_RETENTION_DAYS', 'Días de retención', '30', 'number')}
            </div>

            {renderInput('BACKUP_STORAGE_PATH', 'Ubicación de almacenamiento', '/var/backups/medialab')}

            {renderInput('BACKUP_AUTO_CLEANUP', 'Eliminar automáticamente respaldos antiguos')}
          </>
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

export default BackupConfigModal