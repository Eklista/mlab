import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
  }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-stone-50 to-white hover:from-white hover:to-stone-50 text-zinc-900 focus:ring-white/20 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105',
      secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white focus:ring-zinc-500 disabled:bg-zinc-800/50 border border-zinc-700',
      outline: 'border border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white focus:ring-zinc-500 disabled:border-zinc-700 disabled:text-zinc-500',
      ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 focus:ring-zinc-500 disabled:text-zinc-600',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-600/50'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm gap-2',
      md: 'px-4 py-3 text-sm gap-2',
      lg: 'px-6 py-4 text-base gap-3'
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon}
        
        {children}
        
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button