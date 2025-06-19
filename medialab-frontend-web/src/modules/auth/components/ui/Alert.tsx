import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

const Alert = ({ type = 'info', title, message, onClose, className }: AlertProps): React.JSX.Element => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  }

  const styles = {
    success: 'bg-green-900/30 border-green-700 text-green-300',
    error: 'bg-red-900/30 border-red-700 text-red-300',
    warning: 'bg-yellow-900/30 border-yellow-700 text-yellow-300',
    info: 'bg-blue-900/30 border-blue-700 text-blue-300'
  }

  const iconStyles = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }

  const Icon = icons[type]

  return (
    <div className={clsx(
      'p-4 rounded-lg border backdrop-blur-sm',
      styles[type],
      className
    )}>
      <div className="flex items-start">
        <Icon className={clsx('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', iconStyles[type])} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm opacity-90">
            {message}
          </p>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert