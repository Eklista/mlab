import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { clsx } from 'clsx'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText,
    type = 'text', 
    leftIcon, 
    rightIcon,
    size = 'md',
    className, 
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const baseStyles = 'w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20'
    const errorStyles = 'border-red-500 focus:ring-red-500/20 focus:border-red-500'

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-4 py-4 text-base'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              baseStyles,
              error && errorStyles,
              sizes[size],
              leftIcon && 'pl-10',
              (isPassword || rightIcon) && 'pr-10',
              className
            )}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
              {rightIcon}
            </div>
          )}
        </div>
        
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

Input.displayName = 'Input'
export default Input