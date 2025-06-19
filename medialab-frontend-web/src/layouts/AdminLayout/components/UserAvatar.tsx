// src/layouts/AdminLayout/components/UserAvatar.tsx
import { User } from 'lucide-react'
import { useState } from 'react'

interface UserAvatarProps {
  user?: {
    firstName?: string
    lastName?: string
    email?: string
    avatar?: string
  } | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  clickable?: boolean
  onClick?: () => void
}

const UserAvatar = ({ 
  user, 
  size = 'md', 
  className = '',
  clickable = false,
  onClick 
}: UserAvatarProps): React.JSX.Element => {
  
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base'
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  }

  // Función para obtener las iniciales
  const getInitials = (): string => {
    if (!user) return 'U'
    
    const firstName = user.firstName ?? ''
    const lastName = user.lastName ?? ''
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    
    if (firstName) {
      return firstName.charAt(0).toUpperCase()
    }
    
    if (user.email) {
      return user.email.charAt(0).toUpperCase()
    }
    
    return 'U'
  }

  // Función para generar color de fondo basado en el nombre
  const getBackgroundColor = (): string => {
    if (!user) return 'bg-purple-600'
    
    const name = `${user.firstName ?? ''}${user.lastName ?? ''}${user.email ?? ''}`
    const colors = [
      'bg-purple-600',
      'bg-blue-600',
      'bg-green-600',
      'bg-yellow-600',
      'bg-pink-600',
      'bg-indigo-600',
      'bg-red-600',
      'bg-teal-600'
    ]
    
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length] ?? 'bg-purple-600'
  }

  const avatarClasses = `
    ${sizeClasses[size]} 
    ${getBackgroundColor()} 
    rounded-full 
    flex 
    items-center 
    justify-center 
    text-white 
    font-medium 
    flex-shrink-0
    ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
    ${className}
  `.trim()

  // Verificación muy estricta para el avatar
  const avatarUrl = user?.avatar
  const isValidAvatarUrl = Boolean(
    avatarUrl && 
    typeof avatarUrl === 'string' && 
    avatarUrl.trim().length > 0 &&
    !imageError
  )

  // Si tiene avatar válido, mostrar imagen
  if (isValidAvatarUrl && avatarUrl) {
    return (
      <div className="relative">
        <img
          src={avatarUrl}
          alt={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
          className={avatarClasses}
          onClick={clickable ? onClick : undefined}
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  // Mostrar iniciales o icono por defecto
  return (
    <div 
      className={avatarClasses}
      onClick={clickable ? onClick : undefined}
    >
      {user ? (
        <span>{getInitials()}</span>
      ) : (
        <User className={iconSizeClasses[size]} />
      )}
    </div>
  )
}

export default UserAvatar