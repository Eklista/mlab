// src/core/components/ui/Calendar.tsx
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User } from 'lucide-react'
import { clsx } from 'clsx'
import { Badge } from '@/core/components/ui'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'project-start' | 'project-end' | 'task-due' | 'meeting'
  projectId?: string
  projectTitle?: string
  priority?: 'low' | 'medium' | 'high'
  assignedTo?: string
  time?: string
}

interface CalendarProps {
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  className?: string
}

const Calendar = ({ events = [], onEventClick, className }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Month names
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    const dateString = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  // Check if date is today
  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear
  }

  // Get event type styles
  const getEventTypeStyles = (type: CalendarEvent['type']) => {
    const styles = {
      'project-start': 'bg-green-500/20 text-green-400 border-green-500/30',
      'project-end': 'bg-red-500/20 text-red-400 border-red-500/30',
      'task-due': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'meeting': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
    return styles[type] || styles['meeting']
  }

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    const icons = {
      'project-start': '🚀',
      'project-end': '🏁',
      'task-due': '📋',
      'meeting': '👥'
    }
    return icons[type] || '📅'
  }

  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className={clsx('bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50', className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 text-zinc-400" />
          <h2 className="text-xl font-semibold text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Hoy
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Week headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-zinc-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-24" />
            }

            const dayEvents = getEventsForDate(day)
            const isTodayDate = isToday(day)

            return (
              <div
                key={day}
                className={clsx(
                  'h-24 p-2 border border-zinc-700/30 rounded-lg transition-colors hover:bg-zinc-800/30',
                  isTodayDate && 'bg-blue-500/10 border-blue-500/30'
                )}
              >
                <div className={clsx(
                  'text-sm font-medium mb-1',
                  isTodayDate ? 'text-blue-400' : 'text-zinc-300'
                )}>
                  {day}
                </div>
                
                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className={clsx(
                        'text-xs px-1.5 py-0.5 rounded border cursor-pointer hover:opacity-80 transition-opacity truncate',
                        getEventTypeStyles(event.type)
                      )}
                      title={event.title}
                    >
                      <span className="mr-1">{getEventTypeIcon(event.type)}</span>
                      {event.title}
                    </div>
                  ))}
                  
                  {/* Show more indicator */}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-zinc-500 px-1.5">
                      +{dayEvents.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Legend */}
      <div className="px-6 pb-6">
        <div className="border-t border-zinc-700/50 pt-4">
          <h4 className="text-sm font-medium text-white mb-3">Tipos de Eventos</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/20 border border-green-500/30 rounded"></div>
              <span className="text-zinc-400">Inicio de Proyecto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/20 border border-red-500/30 rounded"></div>
              <span className="text-zinc-400">Entrega de Proyecto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500/20 border border-yellow-500/30 rounded"></div>
              <span className="text-zinc-400">Fecha Límite</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/20 border border-blue-500/30 rounded"></div>
              <span className="text-zinc-400">Reunión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar