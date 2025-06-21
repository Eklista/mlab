// src/core/components/ui/SlideIn.tsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface SlideInProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SlideIn = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'lg',
  className 
}: SlideInProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Slide Panel */}
      <div className={clsx(
        'relative ml-auto h-full bg-zinc-900 border-l border-zinc-700/50 shadow-2xl transform transition-transform duration-300 ease-out',
        sizes[size],
        isOpen ? 'translate-x-0' : 'translate-x-full',
        className
      )}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-zinc-700/50 bg-zinc-900/95 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 overflow-y-auto h-full pb-20">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SlideIn