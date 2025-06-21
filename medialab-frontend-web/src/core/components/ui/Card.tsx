import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className, ...props }, ref) => {
    
    const baseStyles = 'rounded-xl transition-all duration-300'
    
    const variants = {
      default: 'bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 hover:border-zinc-600/50',
      elevated: 'bg-zinc-900/80 backdrop-blur-lg border border-zinc-700/30 shadow-xl shadow-black/20',
      outline: 'border border-zinc-700/50 hover:border-zinc-600/50 bg-transparent',
      glass: 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10'
    }

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card