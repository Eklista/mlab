import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText,
    resize = 'vertical',
    className, 
    ...props 
  }, ref) => {

    const baseStyles = 'w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
    const errorStyles = 'border-red-500 focus:ring-red-500/20 focus:border-red-500'

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={clsx(
            baseStyles,
            error && errorStyles,
            resizeStyles[resize],
            'px-4 py-3 text-sm min-h-[120px]',
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-zinc-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea