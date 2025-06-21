// src/views/admin/settings/SettingsGeneralPage.tsx
import { useState } from 'react'
import { 
  Settings,
  Edit,
  Mail,
  Database,
  Key,
  Shield,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input,
  Modal,
  Textarea
} from '@/core/components/ui'

interface ConfigSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  status: 'configured' | 'pending' | 'error'
  lastUpdated: string
}

interface EmailConfig {
  smtp_host: string
  smtp_port: string
  smtp_user: string
  smtp_password: string
  smtp_tls: boolean
  from_name: string
  from_address: string
}

interface UploadsConfig {
  max_file_size: string
  allowed_types: string
  storage_path: string
  auto_cleanup: boolean
  cleanup_days: string
}

interface APIsConfig {
  youtube_api_key: string
  drive_client_id: string
  drive_client_secret: string
  zoom_api_key: string
  zoom_webhook_secret: string
}

interface SystemConfig {
  app_name: string
  app_version: string
  session_timeout: string
  maintenance_mode: boolean
  debug_enabled: boolean
}

interface BackupConfig {
  enabled: boolean
  frequency: string
  retention_days: string
  storage_location: string
  auto_cleanup: boolean
}

const SettingsGeneralPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})

  // Configuraciones por sección
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    smtp_host: 'smtp.gmail.com',
    smtp_port: '587',
    smtp_user: 'medialab@galileo.edu',
    smtp_password: 'SuperSecretPassword123!',
    smtp_tls: true,
    from_name: 'Medialab Universidad Galileo',
    from_address: 'medialab@galileo.edu'
  })

  const [uploadsConfig, setUploadsConfig] = useState<UploadsConfig>({
    max_file_size: '50',
    allowed_types: 'jpg,jpeg,png,gif,pdf,mp4,mov,avi,mp3,wav,zip,rar',
    storage_path: '/var/uploads/medialab',
    auto_cleanup: true,
    cleanup_days: '30'
  })

  const [apisConfig, setAPIsConfig] = useState<APIsConfig>({
    youtube_api_key: 'AIzaSyC-dK_N5Q1TGHfE0aAS6KkP4ysIFtJWnzU',
    drive_client_id: '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
    drive_client_secret: 'GOCSPX-abcdefghijklmnopqrstuvwxyz',
    zoom_api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjEyMzQ1Njc4OSJ9',
    zoom_webhook_secret: 'webhook_secret_123456'
  })

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    app_name: 'Medialab CRM',
    app_version: '1.0.0',
    session_timeout: '60',
    maintenance_mode: false,
    debug_enabled: false
  })

  const [backupConfig, setBackupConfig] = useState<BackupConfig>({
    enabled: true,
    frequency: 'daily',
    retention_days: '30',
    storage_location: '/var/backups/medialab',
    auto_cleanup: true
  })

  // Secciones de configuración
  const configSections: ConfigSection[] = [
    {
      id: 'email',
      title: 'Configuración de Email',
      description: 'SMTP, remitente y configuración de correos',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      status: 'configured',
      lastUpdated: '2024-06-20'
    },
    {
      id: 'uploads',
      title: 'Gestión de Archivos',
      description: 'Límites de tamaño, tipos permitidos y almacenamiento',
      icon: <Database className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      status: 'configured',
      lastUpdated: '2024-06-18'
    },
    {
      id: 'apis',
      title: 'APIs Externas',
      description: 'YouTube, Google Drive, Zoom y otras integraciones',
      icon: <Key className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-600',
      status: 'pending',
      lastUpdated: '2024-06-15'
    },
    {
      id: 'system',
      title: 'Configuración del Sistema',
      description: 'Nombre de la app, versión, sesiones y modo mantenimiento',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      status: 'configured',
      lastUpdated: '2024-06-19'
    },
    {
      id: 'backup',
      title: 'Respaldos',
      description: 'Frecuencia, retención y ubicación de respaldos',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      status: 'configured',
      lastUpdated: '2024-06-17'
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

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSaveEmail = () => {
    console.log('Guardar configuración de email:', emailConfig)
    setActiveModal(null)
  }

  const handleSaveUploads = () => {
    console.log('Guardar configuración de uploads:', uploadsConfig)
    setActiveModal(null)
  }

  const handleSaveAPIs = () => {
    console.log('Guardar configuración de APIs:', apisConfig)
    setActiveModal(null)
  }

  const handleSaveSystem = () => {
    console.log('Guardar configuración del sistema:', systemConfig)
    setActiveModal(null)
  }

  const handleSaveBackup = () => {
    console.log('Guardar configuración de respaldos:', backupConfig)
    setActiveModal(null)
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

      {/* Email Configuration Modal */}
      <Modal
        isOpen={activeModal === 'email'}
        onClose={() => setActiveModal(null)}
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
            <Input
              label="Servidor SMTP"
              value={emailConfig.smtp_host}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, smtp_host: e.target.value }))}
              placeholder="smtp.gmail.com"
            />
            
            <Input
              label="Puerto SMTP"
              value={emailConfig.smtp_port}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, smtp_port: e.target.value }))}
              placeholder="587"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Usuario SMTP"
              value={emailConfig.smtp_user}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, smtp_user: e.target.value }))}
              placeholder="usuario@dominio.com"
            />
            
            <div className="relative">
              <Input
                label="Contraseña SMTP"
                type={showPasswords.smtp_password ? 'text' : 'password'}
                value={emailConfig.smtp_password}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, smtp_password: e.target.value }))}
                placeholder="Contraseña del servidor"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('smtp_password')}
                className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
              >
                {showPasswords.smtp_password ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="smtp_tls"
              checked={emailConfig.smtp_tls}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, smtp_tls: e.target.checked }))}
              className="rounded border-zinc-600"
            />
            <label htmlFor="smtp_tls" className="text-sm text-zinc-300">
              Habilitar encriptación TLS/SSL
            </label>
          </div>

          <div className="border-t border-zinc-700/50 pt-4">
            <h4 className="text-white font-medium mb-3">Información del Remitente</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Remitente"
                value={emailConfig.from_name}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, from_name: e.target.value }))}
                placeholder="Medialab Universidad Galileo"
              />
              
              <Input
                label="Email del Remitente"
                value={emailConfig.from_address}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, from_address: e.target.value }))}
                placeholder="medialab@galileo.edu"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancelar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveEmail}>
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>

      {/* Uploads Configuration Modal */}
      <Modal
        isOpen={activeModal === 'uploads'}
        onClose={() => setActiveModal(null)}
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
            <Input
              label="Tamaño Máximo (MB)"
              value={uploadsConfig.max_file_size}
              onChange={(e) => setUploadsConfig(prev => ({ ...prev, max_file_size: e.target.value }))}
              placeholder="50"
            />
            
            <Input
              label="Ruta de Almacenamiento"
              value={uploadsConfig.storage_path}
              onChange={(e) => setUploadsConfig(prev => ({ ...prev, storage_path: e.target.value }))}
              placeholder="/var/uploads/medialab"
            />
          </div>

          <Textarea
            label="Tipos de Archivo Permitidos"
            value={uploadsConfig.allowed_types}
            onChange={(e) => setUploadsConfig(prev => ({ ...prev, allowed_types: e.target.value }))}
            placeholder="jpg,jpeg,png,gif,pdf,mp4,mov,avi,mp3,wav,zip,rar"
            helperText="Separar con comas los tipos de archivo permitidos"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto_cleanup"
                checked={uploadsConfig.auto_cleanup}
                onChange={(e) => setUploadsConfig(prev => ({ ...prev, auto_cleanup: e.target.checked }))}
                className="rounded border-zinc-600"
              />
              <label htmlFor="auto_cleanup" className="text-sm text-zinc-300">
                Limpieza automática de archivos temporales
              </label>
            </div>

            {uploadsConfig.auto_cleanup && (
              <Input
                label="Días para limpieza"
                value={uploadsConfig.cleanup_days}
                onChange={(e) => setUploadsConfig(prev => ({ ...prev, cleanup_days: e.target.value }))}
                placeholder="30"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancelar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveUploads}>
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>

      {/* APIs Configuration Modal */}
      <Modal
        isOpen={activeModal === 'apis'}
        onClose={() => setActiveModal(null)}
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
            <div className="relative">
              <Input
                label="API Key"
                type={showPasswords.youtube_api ? 'text' : 'password'}
                value={apisConfig.youtube_api_key}
                onChange={(e) => setAPIsConfig(prev => ({ ...prev, youtube_api_key: e.target.value }))}
                placeholder="AIzaSy..."
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('youtube_api')}
                className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
              >
                {showPasswords.youtube_api ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Google Drive API */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Google Drive API</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="Client ID"
                  type={showPasswords.drive_client_id ? 'text' : 'password'}
                  value={apisConfig.drive_client_id}
                  onChange={(e) => setAPIsConfig(prev => ({ ...prev, drive_client_id: e.target.value }))}
                  placeholder="123456789-abc...apps.googleusercontent.com"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('drive_client_id')}
                  className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
                >
                  {showPasswords.drive_client_id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="relative">
                <Input
                  label="Client Secret"
                  type={showPasswords.drive_client_secret ? 'text' : 'password'}
                  value={apisConfig.drive_client_secret}
                  onChange={(e) => setAPIsConfig(prev => ({ ...prev, drive_client_secret: e.target.value }))}
                  placeholder="GOCSPX-..."
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('drive_client_secret')}
                  className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
                >
                  {showPasswords.drive_client_secret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Zoom API */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Zoom API</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="API Key/JWT"
                  type={showPasswords.zoom_api ? 'text' : 'password'}
                  value={apisConfig.zoom_api_key}
                  onChange={(e) => setAPIsConfig(prev => ({ ...prev, zoom_api_key: e.target.value }))}
                  placeholder="eyJhbGciOiJI..."
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('zoom_api')}
                  className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
                >
                  {showPasswords.zoom_api ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="relative">
                <Input
                  label="Webhook Secret"
                  type={showPasswords.zoom_webhook ? 'text' : 'password'}
                  value={apisConfig.zoom_webhook_secret}
                  onChange={(e) => setAPIsConfig(prev => ({ ...prev, zoom_webhook_secret: e.target.value }))}
                  placeholder="webhook_secret_..."
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('zoom_webhook')}
                  className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-300"
                >
                  {showPasswords.zoom_webhook ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancelar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveAPIs}>
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>

      {/* System Configuration Modal */}
      <Modal
        isOpen={activeModal === 'system'}
        onClose={() => setActiveModal(null)}
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
            <Input
              label="Nombre de la Aplicación"
              value={systemConfig.app_name}
              onChange={(e) => setSystemConfig(prev => ({ ...prev, app_name: e.target.value }))}
              placeholder="Medialab CRM"
            />
            
            <Input
              label="Versión"
              value={systemConfig.app_version}
              onChange={(e) => setSystemConfig(prev => ({ ...prev, app_version: e.target.value }))}
              placeholder="1.0.0"
            />
          </div>

          <Input
            label="Tiempo de expiración de sesión (minutos)"
            value={systemConfig.session_timeout}
            onChange={(e) => setSystemConfig(prev => ({ ...prev, session_timeout: e.target.value }))}
            placeholder="60"
          />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="maintenance_mode"
                checked={systemConfig.maintenance_mode}
                onChange={(e) => setSystemConfig(prev => ({ ...prev, maintenance_mode: e.target.checked }))}
                className="rounded border-zinc-600"
              />
              <label htmlFor="maintenance_mode" className="text-sm text-zinc-300">
                Modo mantenimiento (bloquea acceso a usuarios)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="debug_enabled"
                checked={systemConfig.debug_enabled}
                onChange={(e) => setSystemConfig(prev => ({ ...prev, debug_enabled: e.target.checked }))}
                className="rounded border-zinc-600"
              />
              <label htmlFor="debug_enabled" className="text-sm text-zinc-300">
                Habilitar modo debug (logs detallados)
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancelar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveSystem}>
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>

      {/* Backup Configuration Modal */}
      <Modal
        isOpen={activeModal === 'backup'}
        onClose={() => setActiveModal(null)}
        title="Configuración de Respaldos"
        size="md"
      >
        <div className="space-y-6">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <p className="text-indigo-300 text-sm">
              🛡️ Configuración de respaldos automáticos del sistema
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="backup_enabled"
              checked={backupConfig.enabled}
              onChange={(e) => setBackupConfig(prev => ({ ...prev, enabled: e.target.checked }))}
              className="rounded border-zinc-600"
            />
            <label htmlFor="backup_enabled" className="text-sm text-zinc-300">
              Habilitar respaldos automáticos
            </label>
          </div>

          {backupConfig.enabled && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Frecuencia
                  </label>
                  <select
                    value={backupConfig.frequency}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-3"
                  >
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>
                
                <Input
                  label="Días de retención"
                  value={backupConfig.retention_days}
                  onChange={(e) => setBackupConfig(prev => ({ ...prev, retention_days: e.target.value }))}
                  placeholder="30"
                />
              </div>

              <Input
                label="Ubicación de almacenamiento"
                value={backupConfig.storage_location}
                onChange={(e) => setBackupConfig(prev => ({ ...prev, storage_location: e.target.value }))}
                placeholder="/var/backups/medialab"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="backup_auto_cleanup"
                  checked={backupConfig.auto_cleanup}
                  onChange={(e) => setBackupConfig(prev => ({ ...prev, auto_cleanup: e.target.checked }))}
                  className="rounded border-zinc-600"
                />
                <label htmlFor="backup_auto_cleanup" className="text-sm text-zinc-300">
                  Eliminar automáticamente respaldos antiguos
                </label>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancelar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveBackup}>
              Guardar Configuración
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SettingsGeneralPage