import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Search, X } from 'lucide-react'
import { clsx } from 'clsx'
import Input from './Input'

// Import de iconos de Lucide
import * as LucideIcons from 'lucide-react'

// Import de iconos de marcas de React Icons
import * as SimpleIcons from 'react-icons/si'
import * as FeatherIcons from 'react-icons/fi'
import * as MaterialIcons from 'react-icons/md'

interface IconPickerProps {
  value?: string
  onChange: (iconName: string) => void
  trigger?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

// Lista de iconos organizados por categorías y librerías
const iconCategories = {
  'Plataformas de Video': [
    'SiYoutube', 'SiVimeo', 'SiTwitch', 'SiNetflix', 'SiDisney', 'SiAmazonprime',
    'SiHulu', 'SiTiktok', 'SiInstagram', 'SiFacebook', 'SiTwitter', 'SiLinkedin'
  ],
  'Plataformas de Audio': [
    'SiSpotify', 'SiSoundcloud', 'SiApplemusic', 'SiAmazonmusic', 'SiYoutubemusic',
    'SiDeezer', 'SiPandora', 'SiAudible', 'SiPodcastaddict'
  ],
  'Almacenamiento': [
    'SiGoogledrive', 'SiDropbox', 'SiOnedrive', 'SiIcloud', 'SiBox', 'SiAmazonaws',
    'SiMicrosoftazure', 'SiGooglecloud', 'SiSynology', 'SiNextcloud'
  ],
  'Redes Sociales': [
    'SiFacebook', 'SiInstagram', 'SiTwitter', 'SiLinkedin', 'SiSnapchat', 'SiPinterest',
    'SiReddit', 'SiTumblr', 'SiDiscord', 'SiSlack', 'SiTelegram', 'SiWhatsapp'
  ],
  'Desarrollo': [
    'SiGithub', 'SiGitlab', 'SiBitbucket', 'SiJira', 'SiTrello', 'SiNotion',
    'SiConfluence', 'SiAsana', 'SiMondayDotCom', 'SiClickup'
  ],
  'Comunicación': [
    'SiZoom', 'SiMicrosoftteams', 'SiSkype', 'SiGooglemeet', 'SiSlack', 'SiDiscord',
    'SiTelegram', 'SiWhatsapp', 'SiSignal', 'SiViber'
  ],
  'Educación': [
    'SiUdemy', 'SiCoursera', 'SiKhanacademy', 'SiEdx', 'SiSkillshare', 'SiLinkedinlearning',
    'SiPluralsight', 'SiCodecademy', 'SiFreecodecampdotorg'
  ],
  'General (Lucide)': [
    'Home', 'User', 'Users', 'Settings', 'Search', 'Plus', 'Edit', 'Trash2', 'Save',
    'Download', 'Upload', 'Copy', 'Check', 'X', 'Mail', 'Phone', 'Calendar',
    'Clock', 'Star', 'Heart', 'Eye', 'Lock', 'Shield', 'Key', 'Globe', 'Link'
  ],
  'Media (Lucide)': [
    'Play', 'Pause', 'Square', 'SkipBack', 'SkipForward', 'Camera', 'Image',
    'Music', 'Film', 'Radio', 'Tv', 'Video', 'Mic', 'Volume2', 'Headphones'
  ],
  'Archivos (Lucide)': [
    'File', 'FileText', 'FolderOpen', 'Folder', 'Archive', 'Database',
    'HardDrive', 'Cloud', 'Server', 'Monitor', 'Smartphone', 'Tablet'
  ]
}

const IconPicker = ({ 
  value, 
  onChange, 
  trigger, 
  placeholder = 'Seleccionar icono',
  disabled = false,
  className,
  size = 'md'
}: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Plataformas de Video')
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  // Obtener todos los iconos disponibles
  const allIcons = Object.values(iconCategories).flat()
  
  // Filtrar iconos basado en búsqueda
  const filteredIcons = searchTerm 
    ? allIcons.filter(iconName => 
        iconName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : (iconCategories[selectedCategory as keyof typeof iconCategories] || iconCategories['General (Lucide)'])

  // Calcular posición del dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      
      // Si hay más espacio arriba, abrir hacia arriba
      const openUpward = spaceBelow < 400 && spaceAbove > spaceBelow
      
      setDropdownPosition({
        top: openUpward ? rect.top - 400 + window.scrollY : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 400)
      })
    }
  }, [isOpen])

  // Obtener componente de icono desde múltiples librerías
  const getIconComponent = (iconName: string) => {
    // Simple Icons (marcas)
    if (iconName.startsWith('Si')) {
      const IconComponent = (SimpleIcons as any)[iconName]
      if (IconComponent) return IconComponent
    }
    
    // Feather Icons
    if (iconName.startsWith('Fi')) {
      const IconComponent = (FeatherIcons as any)[iconName]
      if (IconComponent) return IconComponent
    }
    
    // Material Icons
    if (iconName.startsWith('Md')) {
      const IconComponent = (MaterialIcons as any)[iconName]
      if (IconComponent) return IconComponent
    }
    
    // Lucide Icons (default)
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.HelpCircle
  }

  // Renderizar icono seleccionado
  const renderSelectedIcon = () => {
    if (!value) return null
    const IconComponent = getIconComponent(value)
    return <IconComponent className={clsx(
      size === 'sm' && 'w-4 h-4',
      size === 'md' && 'w-5 h-5',
      size === 'lg' && 'w-6 h-6'
    )} />
  }

  const handleIconSelect = (iconName: string) => {
    onChange(iconName)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchTerm('')
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  // Obtener nombre de display del icono
  const getDisplayName = (iconName: string) => {
    if (iconName.startsWith('Si')) {
      return iconName.replace('Si', '').replace(/([A-Z])/g, ' $1').trim()
    }
    return iconName.replace(/([A-Z])/g, ' $1').trim()
  }

  return (
    <div className={clsx('relative', className)}>
      <div ref={triggerRef}>
        {trigger ? (
          <div onClick={() => !disabled && setIsOpen(!isOpen)}>
            {trigger}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={clsx(
              'w-full flex items-center justify-between bg-zinc-800/50 border border-zinc-700 text-white rounded-lg transition-all duration-200 hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20',
              sizeStyles[size],
              disabled && 'opacity-50 cursor-not-allowed',
              !value && 'text-zinc-400'
            )}
          >
            <div className="flex items-center gap-2">
              {renderSelectedIcon()}
              <span>{value ? getDisplayName(value) : placeholder}</span>
            </div>
            <LucideIcons.ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>
        )}
      </div>

      {/* Portal para el dropdown */}
      {isOpen && !disabled && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998]"
            onClick={handleClose}
          />
          
          {/* Dropdown */}
          <div 
            className="fixed bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-[9999] overflow-hidden"
            style={{
              top: dropdownPosition.top + 4,
              left: dropdownPosition.left,
              width: Math.max(dropdownPosition.width, 500)
            }}
          >
            {/* Header con búsqueda */}
            <div className="p-4 border-b border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">Seleccionar Icono</h3>
                <button
                  onClick={handleClose}
                  className="p-1 text-zinc-400 hover:text-white rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <Input
                placeholder="Buscar iconos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                size="sm"
              />
            </div>

            {/* Categorías (solo si no hay búsqueda) */}
            {!searchTerm && (
              <div className="p-2 border-b border-zinc-700">
                <div className="grid grid-cols-2 gap-1">
                  {Object.keys(iconCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={clsx(
                        'px-2 py-1 text-xs rounded transition-colors text-left',
                        selectedCategory === category
                          ? 'bg-white text-zinc-900'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grid de iconos */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {searchTerm && (
                <div className="mb-3">
                  <span className="text-sm text-zinc-400">
                    {filteredIcons.length} icono(s) encontrado(s)
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-8 gap-2">
                {filteredIcons.map((iconName: string) => {
                  const IconComponent = getIconComponent(iconName)
                  const isSelected = value === iconName
                  
                  return (
                    <button
                      key={iconName}
                      onClick={() => handleIconSelect(iconName)}
                      className={clsx(
                        'p-3 rounded-lg border-2 transition-all flex items-center justify-center group relative',
                        isSelected
                          ? 'border-white bg-white/10 text-white'
                          : 'border-zinc-600 hover:border-zinc-400 text-zinc-400 hover:text-white hover:bg-zinc-700/50'
                      )}
                      title={getDisplayName(iconName)}
                    >
                      <IconComponent className="w-5 h-5" />
                      
                      {/* Tooltip con nombre del icono */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {getDisplayName(iconName)}
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {filteredIcons.length === 0 && (
                <div className="text-center py-8 text-zinc-400">
                  <LucideIcons.Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No se encontraron iconos</p>
                  <p className="text-sm">Intenta con otro término de búsqueda</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-zinc-700 bg-zinc-800/50">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>
                  {Object.values(iconCategories).flat().length} iconos disponibles
                </span>
                <span>
                  Lucide + Simple Icons + React Icons
                </span>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}

export default IconPicker