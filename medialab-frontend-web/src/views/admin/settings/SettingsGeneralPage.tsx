import { useState, useEffect } from 'react'
import { 
  Settings,
  Edit,
  Mail,
  Database,
  Key,
  Shield,
  Server,
  Clock
} from 'lucide-react'
import { 
  Button, 
  Card
} from '@/core/components/ui'

// Import modals
import {
  EmailConfigModal,
  SystemConfigModal,
  UploadsConfigModal,
  APIsConfigModal,
  BackupConfigModal
} from './components/modals'
import type { Configuration } from './components/modals'

interface ConfigSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  status: 'configured' | 'pending' | 'error'
  lastUpdated: string
  configKeys: string[]
}

const SettingsGeneralPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [configurations, setConfigurations] = useState<Configuration[]>([])

  // Mock configurations from database
  useEffect(() => {
    const mockConfigurations: Configuration[] = [
      // Email/SMTP
      { key: 'SMTP_HOST', value: 'smtp.gmail.com', type: 'string', isEncrypted: false, description: 'Servidor SMTP para envío de emails' },
      { key: 'SMTP_PORT', value: '587', type: 'number', isEncrypted: false, description: 'Puerto del servidor SMTP' },
      { key: 'SMTP_USER', value: 'medialab@galileo.edu', type: 'string', isEncrypted: false, description: 'Usuario SMTP' },
      { key: 'SMTP_PASSWORD', value: 'encrypted_password', type: 'password', isEncrypted: true, description: 'Contraseña SMTP' },
      { key: 'SMTP_TLS', value: 'true', type: 'boolean', isEncrypted: false, description: 'Habilitar encriptación TLS' },
      { key: 'MAIL_FROM_NAME', value: 'Medialab Universidad Galileo', type: 'string', isEncrypted: false, description: 'Nombre del remitente' },
      { key: 'MAIL_FROM_ADDRESS', value: 'medialab@galileo.edu', type: 'string', isEncrypted: false, description: 'Email del remitente' },
      
      // File Upload
      { key: 'MAX_FILE_SIZE_MB', value: '50', type: 'number', isEncrypted: false, description: 'Tamaño máximo de archivo en MB' },
      { key: 'ALLOWED_FILE_TYPES', value: 'jpg,jpeg,png,gif,pdf,mp4,mov,avi,mp3,wav,zip,rar', type: 'string', isEncrypted: false, description: 'Tipos de archivo permitidos' },
      { key: 'UPLOAD_PATH', value: '/var/uploads/medialab', type: 'string', isEncrypted: false, description: 'Ruta de almacenamiento' },
      { key: 'AUTO_CLEANUP_ENABLED', value: 'true', type: 'boolean', isEncrypted: false, description: 'Limpieza automática habilitada' },
      { key: 'CLEANUP_DAYS', value: '30', type: 'number', isEncrypted: false, description: 'Días para limpieza automática' },
      
      // System
      { key: 'APP_NAME', value: 'Medialab CRM', type: 'string', isEncrypted: false, description: 'Nombre de la aplicación' },
      { key: 'APP_VERSION', value: '1.0.0', type: 'string', isEncrypted: false, description: 'Versión de la aplicación' },
      { key: 'SESSION_TIMEOUT_MINUTES', value: '60', type: 'number', isEncrypted: false, description: 'Tiempo de expiración de sesión en minutos' },
      { key: 'MAINTENANCE_MODE', value: 'false', type: 'boolean', isEncrypted: false, description: 'Modo mantenimiento activo' },
      { key: 'DEBUG_ENABLED', value: 'false', type: 'boolean', isEncrypted: false, description: 'Modo debug habilitado' },
      
      // APIs
      { key: 'YOUTUBE_API_KEY', value: 'encrypted_youtube_key', type: 'password', isEncrypted: true, description: 'API Key de YouTube' },
      { key: 'GOOGLE_DRIVE_CLIENT_ID', value: 'encrypted_drive_client_id', type: 'password', isEncrypted: true, description: 'Google Drive Client ID' },
      { key: 'GOOGLE_DRIVE_CLIENT_SECRET', value: 'encrypted_drive_secret', type: 'password', isEncrypted: true, description: 'Google Drive Client Secret' },
      { key: 'ZOOM_API_KEY', value: 'encrypted_zoom_key', type: 'password', isEncrypted: true, description: 'Zoom API Key' },
      { key: 'ZOOM_WEBHOOK_SECRET', value: 'encrypted_zoom_webhook', type: 'password', isEncrypted: true, description: 'Zoom Webhook Secret' },
      
      // Backup
      { key: 'BACKUP_ENABLED', value: 'true', type: 'boolean', isEncrypted: false, description: 'Respaldos automáticos habilitados' },
      { key: 'BACKUP_FREQUENCY', value: 'daily', type: 'string', isEncrypted: false, description: 'Frecuencia de respaldos' },
      { key: 'BACKUP_RETENTION_DAYS', value: '30', type: 'number', isEncrypted: false, description: 'Días de retención de respaldos' },
      { key: 'BACKUP_STORAGE_PATH', value: '/var/backups/medialab', type: 'string', isEncrypted: false, description: 'Ruta de almacenamiento de respaldos' },
      { key: 'BACKUP_AUTO_CLEANUP', value: 'true', type: 'boolean', isEncrypted: false, description: 'Limpieza automática de respaldos' }
    ]
    
    setConfigurations(mockConfigurations)
  }, [])

  // Secciones de configuración
  const configSections: ConfigSection[] = [
    {
      id: 'email',
      title: 'Configuración de Email',
      description: 'SMTP, remitente y configuración de correos',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      status: 'configured',
      lastUpdated: '2024-06-20',
      configKeys: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_TLS', 'MAIL_FROM_NAME', 'MAIL_FROM_ADDRESS']
    },
    {
      id: 'uploads',
      title: 'Gestión de Archivos',
      description: 'Límites de tamaño, tipos permitidos y almacenamiento',
      icon: <Database className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      status: 'configured',
      lastUpdated: '2024-06-18',
      configKeys: ['MAX_FILE_SIZE_MB', 'ALLOWED_FILE_TYPES', 'UPLOAD_PATH', 'AUTO_CLEANUP_ENABLED', 'CLEANUP_DAYS']
    },
    {
      id: 'apis',
      title: 'APIs Externas',
      description: 'YouTube, Google Drive, Zoom y otras integraciones',
      icon: <Key className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-600',
      status: 'pending',
      lastUpdated: '2024-06-15',
      configKeys: ['YOUTUBE_API_KEY', 'GOOGLE_DRIVE_CLIENT_ID', 'GOOGLE_DRIVE_CLIENT_SECRET', 'ZOOM_API_KEY', 'ZOOM_WEBHOOK_SECRET']
    },
    {
      id: 'system',
      title: 'Configuración del Sistema',
      description: 'Nombre de la app, versión, sesiones y modo mantenimiento',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      status: 'configured',
      lastUpdated: '2024-06-19',
      configKeys: ['APP_NAME', 'APP_VERSION', 'SESSION_TIMEOUT_MINUTES', 'MAINTENANCE_MODE', 'DEBUG_ENABLED']
    },
    {
      id: 'backup',
      title: 'Respaldos',
      description: 'Frecuencia, retención y ubicación de respaldos',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      status: 'configured',
      lastUpdated: '2024-06-17',
      configKeys: ['BACKUP_ENABLED', 'BACKUP_FREQUENCY', 'BACKUP_RETENTION_DAYS', 'BACKUP_STORAGE_PATH', 'BACKUP_AUTO_CLEANUP']
    }
  ]

  const getStatusBadge = (status: ConfigSection['status']) => {
    const styles = {
      configured: 'bg-green-500/20 text-green-400 border border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30'
    }

    const labels = {
      configured: '✓ Configurado',
      pending: '⏳ Pendiente',
      error: '❌ Error'
    }

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const handleSaveSection = (sectionId: string, data: {[key: string]: any}) => {
    console.log(`Guardar configuración de ${sectionId}:`, data)
    
    // Aquí iríamos al backend para actualizar las configuraciones
    // Por ahora solo actualizamos el estado local
    const updatedConfigurations = configurations.map(config => {
      if (data[config.key] !== undefined) {
        return {
          ...config,
          value: typeof data[config.key] === 'boolean' ? data[config.key].toString() : data[config.key]
        }
      }
      return config
    })
    
    setConfigurations(updatedConfigurations)
    setActiveModal(null)
    
    // Mostrar notificación de éxito
    console.log('Configuración guardada exitosamente')
  }

  const renderModal = () => {
    switch (activeModal) {
      case 'email':
        return (
          <EmailConfigModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            configurations={configurations}
            onSave={(data) => handleSaveSection('email', data)}
          />
        )
      case 'system':
        return (
          <SystemConfigModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            configurations={configurations}
            onSave={(data) => handleSaveSection('system', data)}
          />
        )
      case 'uploads':
        return (
          <UploadsConfigModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            configurations={configurations}
            onSave={(data) => handleSaveSection('uploads', data)}
          />
        )
      case 'apis':
        return (
          <APIsConfigModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            configurations={configurations}
            onSave={(data) => handleSaveSection('apis', data)}
          />
        )
      case 'backup':
        return (
          <BackupConfigModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            configurations={configurations}
            onSave={(data) => handleSaveSection('backup', data)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Configuración General
          </h1>
          <p className="text-zinc-400">
            Administración de configuraciones del sistema por secciones
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {configurations.length}
              </p>
              <p className="text-sm text-zinc-400">Configuraciones</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {configurations.filter(c => c.isEncrypted).length}
              </p>
              <p className="text-sm text-zinc-400">Encriptadas</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Server className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {configSections.filter(s => s.status === 'configured').length}
              </p>
              <p className="text-sm text-zinc-400">Secciones OK</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {configSections.filter(s => s.status === 'pending').length}
              </p>
              <p className="text-sm text-zinc-400">Pendientes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configSections.map((section) => (
          <Card key={section.id} className="hover:scale-105 transition-transform duration-200">
            <div className="space-y-4">
              {/* Section Header */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                  {section.icon}
                </div>
                {getStatusBadge(section.status)}
              </div>

              {/* Section Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Config Count */}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Settings className="w-3 h-3" />
                <span>{section.configKeys.length} configuraciones</span>
              </div>

              {/* Section Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-700/50">
                <span className="text-xs text-zinc-500">
                  Actualizado: {new Date(section.lastUpdated).toLocaleDateString()}
                </span>
                <Button
                  size="sm"
                  leftIcon={<Edit className="w-4 h-4" />}
                  onClick={() => setActiveModal(section.id)}
                >
                  Configurar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Render active modal */}
      {renderModal()}
    </div>
  )
}

export default SettingsGeneralPage