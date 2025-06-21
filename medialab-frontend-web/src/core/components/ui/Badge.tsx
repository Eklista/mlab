import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors'
    
    const variants = {
      default: 'bg-zinc-800 text-zinc-200 border border-zinc-700',
      secondary: 'bg-zinc-700 text-zinc-300',
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
      info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    }

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base'
    }

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'
export default Badge