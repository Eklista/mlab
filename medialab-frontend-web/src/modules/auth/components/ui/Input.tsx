import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { clsx } from 'clsx'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  type?: 'text' | 'email' | 'password'
  leftIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', leftIcon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all duration-200',
              leftIcon && 'pl-10',
              isPassword && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input