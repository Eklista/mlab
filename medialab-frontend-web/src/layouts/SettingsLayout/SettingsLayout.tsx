// src/layouts/SettingsLayout/SettingsLayout.tsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Settings,
  Users,
  UserCheck,
  Shield,
  Link as LinkIcon,
  Flag,
  Star,
  Grid,
  Building,
  GraduationCap,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { clsx } from 'clsx'

interface SettingsNavItem {
  id: string
  label: string
  icon: React.ReactNode
  path?: string
  children?: SettingsNavItem[]
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<string[]>(['university'])

  const navItems: SettingsNavItem[] = [
    {
      id: 'general',
      label: 'Configuración General',
      icon: <Settings className="w-4 h-4" />,
      path: '/admin/settings/general'
    },
    {
      id: 'user-management',
      label: 'Gestión de Usuarios',
      icon: <Users className="w-4 h-4" />,
      children: [
        {
          id: 'user-types',
          label: 'Tipos de Usuario',
          icon: <UserCheck className="w-4 h-4" />,
          path: '/admin/settings/user-types'
        },
        {
          id: 'employee-roles',
          label: 'Roles de Empleado',
          icon: <Shield className="w-4 h-4" />,
          path: '/admin/settings/employee-roles'
        }
      ]
    },
    {
      id: 'system',
      label: 'Sistema',
      icon: <Grid className="w-4 h-4" />,
      children: [
        {
          id: 'platforms',
          label: 'Plataformas de Enlaces',
          icon: <LinkIcon className="w-4 h-4" />,
          path: '/admin/settings/platforms'
        },
        {
          id: 'status-types',
          label: 'Tipos de Estado',
          icon: <Flag className="w-4 h-4" />,
          path: '/admin/settings/status-types'
        },
        {
          id: 'priorities',
          label: 'Prioridades',
          icon: <Star className="w-4 h-4" />,
          path: '/admin/settings/priorities'
        },
        {
          id: 'services',
          label: 'Categorías de Servicio',
          icon: <Grid className="w-4 h-4" />,
          path: '/admin/settings/services'
        }
      ]
    },
    {
      id: 'university',
      label: 'Estructura Universitaria',
      icon: <Building className="w-4 h-4" />,
      children: [
        {
          id: 'units',
          label: 'Unidades',
          icon: <Building className="w-4 h-4" />,
          path: '/admin/settings/units'
        },
        {
          id: 'unit-types',
          label: 'Tipos de Unidad',
          icon: <Grid className="w-4 h-4" />,
          path: '/admin/settings/unit-types'
        },
        {
          id: 'professors',
          label: 'Profesores',
          icon: <GraduationCap className="w-4 h-4" />,
          path: '/admin/settings/professors'
        }
      ]
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const isActive = (path: string) => location.pathname === path

  const isParentActive = (item: SettingsNavItem) => {
    if (item.path && isActive(item.path)) return true
    if (item.children) {
      return item.children.some(child => child.path && isActive(child.path))
    }
    return false
  }

  const renderNavItem = (item: SettingsNavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedSections.includes(item.id)
    const itemIsActive = isParentActive(item)

    return (
      <div key={item.id}>
        {hasChildren ? (
          <button
            onClick={() => toggleSection(item.id)}
            className={clsx(
              'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
              depth > 0 && 'ml-4',
              itemIsActive 
                ? 'bg-white/10 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            )}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <Link
            to={item.path!}
            className={clsx(
              'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
              depth > 0 && 'ml-4',
              isActive(item.path!) 
                ? 'bg-white/10 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <div className="w-64 bg-zinc-900/50 border-r border-zinc-700/50 flex-shrink-0">
        <div className="p-4 border-b border-zinc-700/50">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Administración del sistema
          </p>
        </div>

        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map(item => renderNavItem(item))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout