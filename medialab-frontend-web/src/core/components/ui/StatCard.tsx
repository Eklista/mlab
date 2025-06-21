import { clsx } from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  subtitle?: string
  className?: string
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  subtitle,
  className 
}: StatCardProps) => {
  const baseStyles = 'bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300'

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'down':
        return 'bg-red-500/10 text-red-400 border border-red-500/20'
      default:
        return 'bg-zinc-700 text-zinc-300'
    }
  }

  return (
    <div className={clsx(baseStyles, className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-zinc-800 rounded-lg">
              {icon}
            </div>
          )}
          <h3 className="text-zinc-400 text-sm font-medium">
            {title}
          </h3>
        </div>
        
        {change && trend && (
          <div className={clsx(
            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            getTrendColor()
          )}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard