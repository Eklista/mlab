import { useState, useEffect } from 'react'
import { Save, Eye, EyeOff, Shield } from 'lucide-react'
import { Button, Modal, Input, Badge } from '@/core/components/ui'

export interface Configuration {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'password'
  isEncrypted: boolean
  description: string
}

export interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
  configurations: Configuration[]
  onSave: (data: {[key: string]: any}) => void
}

interface EmailConfigModalProps extends ConfigModalProps {}

const EmailConfigModal = ({ isOpen, onClose, configurations, onSave }: EmailConfigModalProps) => {
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})
  const [formData, setFormData] = useState<{[key: string]: any}>({})

  // Inicializar form data cuando se abra el modal
  useEffect(() => {
    if (isOpen && configurations.length > 0) {
      const emailKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_TLS', 'MAIL_FROM_NAME', 'MAIL_FROM_ADDRESS']
      const initialData: {[key: string]: any} = {}
      
      emailKeys.forEach(key => {
        const config = configurations.find(c => c.key === key)
        if (config) {
          initialData[key] = config.type === 'boolean' ? config.value === 'true' : config.value
        }
      })
      
      setFormData(initialData)
    }
  }, [isOpen, configurations])

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

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

    const isPassword = config.type === 'password'
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
      <div className="relative">
        <Input
          label={label}
          type={isPassword ? (showPasswords[configKey] ? 'text' : 'password') : type || 'text'}
          value={formData[configKey] || ''}
          onChange={(e) => updateFormValue(configKey, e.target.value)}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(configKey)}
            className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
          >
            {showPasswords[configKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {config.isEncrypted && (
          <div className="absolute top-2 right-10">
            <Badge variant="warning" size="sm">
              <Shield className="w-3 h-3 mr-1" />
              Encriptado
            </Badge>
          </div>
        )}
      </div>
    )
  }

  const handleSave = () => {
    const emailData = {
      SMTP_HOST: formData['SMTP_HOST'],
      SMTP_PORT: formData['SMTP_PORT'],
      SMTP_USER: formData['SMTP_USER'],
      SMTP_PASSWORD: formData['SMTP_PASSWORD'],
      SMTP_TLS: formData['SMTP_TLS'],
      MAIL_FROM_NAME: formData['MAIL_FROM_NAME'],
      MAIL_FROM_ADDRESS: formData['MAIL_FROM_ADDRESS']
    }
    
    onSave(emailData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración de Email/SMTP"
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            💡 Configura los parámetros SMTP para el envío de emails desde el sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('SMTP_HOST', 'Servidor SMTP', 'smtp.gmail.com')}
          {renderInput('SMTP_PORT', 'Puerto SMTP', '587', 'number')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('SMTP_USER', 'Usuario SMTP', 'usuario@dominio.com')}
          {renderInput('SMTP_PASSWORD', 'Contraseña SMTP', 'Contraseña del servidor')}
        </div>

        {renderInput('SMTP_TLS', 'Habilitar encriptación TLS/SSL')}

        <div className="border-t border-zinc-700/50 pt-4">
          <h4 className="text-white font-medium mb-3">Información del Remitente</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('MAIL_FROM_NAME', 'Nombre del Remitente', 'Medialab Universidad Galileo')}
            {renderInput('MAIL_FROM_ADDRESS', 'Email del Remitente', 'medialab@galileo.edu')}
          </div>
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

export default EmailConfigModal