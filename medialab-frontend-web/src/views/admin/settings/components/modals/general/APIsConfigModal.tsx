import { useState, useEffect } from 'react'
import { Save, Eye, EyeOff, Shield } from 'lucide-react'
import { Button, Modal, Input, Badge } from '@/core/components/ui'
import type { ConfigModalProps } from './EmailConfigModal'

interface APIsConfigModalProps extends ConfigModalProps {}

const APIsConfigModal = ({ isOpen, onClose, configurations, onSave }: APIsConfigModalProps) => {
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})
  const [formData, setFormData] = useState<{[key: string]: any}>({})

  // Inicializar form data cuando se abra el modal
  useEffect(() => {
    if (isOpen && configurations.length > 0) {
      const apiKeys = ['YOUTUBE_API_KEY', 'GOOGLE_DRIVE_CLIENT_ID', 'GOOGLE_DRIVE_CLIENT_SECRET', 'ZOOM_API_KEY', 'ZOOM_WEBHOOK_SECRET']
      const initialData: {[key: string]: any} = {}
      
      apiKeys.forEach(key => {
        const config = configurations.find(c => c.key === key)
        if (config) {
          initialData[key] = config.value
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

  const renderInput = (configKey: string, label: string, placeholder?: string) => {
    const config = getConfigByKey(configKey)
    if (!config) return null

    const isPassword = config.type === 'password'

    return (
      <div className="relative">
        <Input
          label={label}
          type={isPassword ? (showPasswords[configKey] ? 'text' : 'password') : 'text'}
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
    const apiData = {
      YOUTUBE_API_KEY: formData['YOUTUBE_API_KEY'],
      GOOGLE_DRIVE_CLIENT_ID: formData['GOOGLE_DRIVE_CLIENT_ID'],
      GOOGLE_DRIVE_CLIENT_SECRET: formData['GOOGLE_DRIVE_CLIENT_SECRET'],
      ZOOM_API_KEY: formData['ZOOM_API_KEY'],
      ZOOM_WEBHOOK_SECRET: formData['ZOOM_WEBHOOK_SECRET']
    }
    
    onSave(apiData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuración de APIs Externas"
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <p className="text-purple-300 text-sm">
            🔗 Configura las API keys para integración con servicios externos
          </p>
        </div>

        {/* YouTube API */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">YouTube API</h4>
          {renderInput('YOUTUBE_API_KEY', 'API Key', 'AIzaSy...')}
        </div>

        {/* Google Drive API */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Google Drive API</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('GOOGLE_DRIVE_CLIENT_ID', 'Client ID', '123456789-abc...apps.googleusercontent.com')}
            {renderInput('GOOGLE_DRIVE_CLIENT_SECRET', 'Client Secret', 'GOCSPX-...')}
          </div>
        </div>

        {/* Zoom API */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Zoom API</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('ZOOM_API_KEY', 'API Key/JWT', 'eyJhbGciOiJI...')}
            {renderInput('ZOOM_WEBHOOK_SECRET', 'Webhook Secret', 'webhook_secret_...')}
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

export default APIsConfigModal