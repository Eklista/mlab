// src/layouts/AdminLayout/components/panels/CalendarPanel.tsx
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface CalendarEvent {
  id: string
  title: string
  time: string
  type: 'meeting' | 'deadline' | 'reminder' | 'event'
  attendees?: number
  location?: string
}

const CalendarPanel = (): React.JSX.Element => {
  const [currentDate] = useState(new Date())
  
  // Mock data - reemplazar con datos reales
  const todayEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Reunión de proyecto ABC',
      time: '09:00',
      type: 'meeting',
      attendees: 4,
      location: 'Sala de conferencias'
    },
    {
      id: '2',
      title: 'Entrega video institucional',
      time: '14:00',
      type: 'deadline'
    },
    {
      id: '3',
      title: 'Revisión de equipos',
      time: '16:30',
      type: 'reminder'
    }
  ]

  const upcomingEvents: CalendarEvent[] = [
    {
      id: '4',
      title: 'Sesión de fotos externa',
      time: 'Mañana 10:00',
      type: 'event',
      location: 'Campus principal'
    },
    {
      id: '5',
      title: 'Reunión mensual de departamento',
      time: 'Viernes 15:00',
      type: 'meeting',
      attendees: 12
    }
  ]

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return '👥'
      case 'deadline':
        return '⚡'
      case 'reminder':
        return '🔔'
      case 'event':
        return '📅'
      default:
        return '📋'
    }
  }

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'border-l-blue-500'
      case 'deadline': return 'border-l-red-500'
      case 'reminder': return 'border-l-yellow-500'
      case 'event': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Mi Agenda</h3>
          <button className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>
        
        {/* Date navigation */}
        <div className="flex items-center justify-between mb-3">
          <button className="p-1 text-white/60 hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="text-white text-sm font-medium capitalize">
              {formatDate(currentDate)}
            </p>
            <p className="text-white/60 text-xs">
              {getCurrentTime()}
            </p>
          </div>
          <button className="p-1 text-white/60 hover:text-white transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="text-sm text-white/60 text-center">
          <span className="text-white font-medium">{todayEvents.length}</span> eventos hoy
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Today's events */}
        {todayEvents.length > 0 && (
          <div className="p-4 border-b border-white/10">
            <h4 className="text-sm font-medium text-white/70 mb-3">Hoy</h4>
            <div className="space-y-3">
              {todayEvents.map(event => (
                <div 
                  key={event.id}
                  className={`bg-white/5 rounded-lg p-3 border-l-2 ${getEventColor(event.type)} hover:bg-white/10 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg">
                      {getEventIcon(event.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-white text-sm font-medium truncate">
                          {event.title}
                        </h5>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        {event.attendees && (
                          <span>{event.attendees} participantes</span>
                        )}
                        {event.location && (
                          <span>{event.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming events */}
        {upcomingEvents.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-medium text-white/70 mb-3">Próximamente</h4>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id}
                  className={`bg-white/5 rounded-lg p-3 border-l-2 ${getEventColor(event.type)} hover:bg-white/10 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg">
                      {getEventIcon(event.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white text-sm font-medium truncate mb-1">
                        {event.title}
                      </h5>
                      
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span>{event.time}</span>
                        {event.attendees && (
                          <span>{event.attendees} participantes</span>
                        )}
                        {event.location && (
                          <span>{event.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {todayEvents.length === 0 && upcomingEvents.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-white/60">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-white/40" />
              <p className="text-sm mb-2">No hay eventos programados</p>
              <button className="text-purple-400 hover:text-purple-300 text-sm">
                Crear nuevo evento
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-left text-sm text-purple-400 hover:text-purple-300 transition-colors">
          Ver calendario completo
        </button>
      </div>
    </div>
  )
}

export default CalendarPanel