// src/views/admin/CalendarPage.tsx
import { useState } from 'react'
import { Calendar as CalendarIcon, Filter, Download, Plus } from 'lucide-react'
import { Button, Card, Badge, Modal, Calendar } from '@/core/components/ui'

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
  description?: string
}

const CalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)

  // Mock events data - en producción vendría de proyectos reales
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Video Medicina - Inicio',
      date: '2025-06-01',
      type: 'project-start',
      projectId: '1',
      projectTitle: 'Video Promocional Facultad de Medicina',
      priority: 'high',
      assignedTo: 'Ana García',
      time: '09:00',
      description: 'Inicio del proyecto de video promocional para la maestría'
    },
    {
      id: '2',
      title: 'Reunión Pre-producción',
      date: '2025-06-03',
      type: 'meeting',
      projectId: '1',
      projectTitle: 'Video Promocional Facultad de Medicina',
      time: '14:00',
      description: 'Reunión con el cliente para definir conceptos y cronograma'
    },
    {
      id: '3',
      title: 'Entrega Storyboard',
      date: '2025-06-10',
      type: 'task-due',
      projectId: '1',
      assignedTo: 'Carlos López',
      time: '17:00',
      description: 'Fecha límite para entrega del storyboard'
    },
    {
      id: '4',
      title: 'Grabación Principal',
      date: '2025-06-15',
      type: 'meeting',
      projectId: '1',
      time: '08:00',
      description: 'Día de grabación en las instalaciones de la facultad'
    },
    {
      id: '5',
      title: 'Entrega Primera Edición',
      date: '2025-06-25',
      type: 'task-due',
      projectId: '1',
      assignedTo: 'Ana García',
      time: '18:00',
      description: 'Primera versión editada para revisión interna'
    },
    {
      id: '6',
      title: 'Video Medicina - Entrega',
      date: '2025-07-15',
      type: 'project-end',
      projectId: '1',
      projectTitle: 'Video Promocional Facultad de Medicina',
      priority: 'high',
      time: '12:00',
      description: 'Entrega final del proyecto al cliente'
    },
    {
      id: '7',
      title: 'Foto Graduación - Inicio',
      date: '2025-07-20',
      type: 'project-start',
      projectId: '2',
      projectTitle: 'Fotografía Evento Graduación',
      priority: 'medium',
      assignedTo: 'María Rodríguez',
      time: '07:00',
      description: 'Inicio de cobertura fotográfica del evento'
    },
    {
      id: '8',
      title: 'Evento Graduación',
      date: '2025-07-22',
      type: 'meeting',
      projectId: '2',
      time: '16:00',
      description: 'Ceremonia de graduación - cobertura completa'
    }
  ]

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const getEventTypeLabel = (type: CalendarEvent['type']) => {
    const labels = {
      'project-start': 'Inicio de Proyecto',
      'project-end': 'Entrega de Proyecto',
      'task-due': 'Fecha Límite',
      'meeting': 'Reunión/Evento'
    }
    return labels[type]
  }

  const getPriorityBadge = (priority?: 'low' | 'medium' | 'high') => {
    if (!priority) return null
    
    const variants = {
      low: 'secondary',
      medium: 'warning', 
      high: 'danger'
    } as const

    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    }

    return (
      <Badge variant={variants[priority]} size="sm">
        {labels[priority]}
      </Badge>
    )
  }

  // Próximos eventos (siguientes 7 días)
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date)
      const today = new Date()
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      return eventDate >= today && eventDate <= nextWeek
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Calendario de Proyectos
          </h1>
          <p className="text-zinc-400">
            Fechas importantes, entregas y eventos del departamento
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filtros
          </Button>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Nuevo Evento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-3">
          <Calendar 
            events={events}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{event.title}</h4>
                    {getPriorityBadge(event.priority)}
                  </div>
                  <div className="text-xs text-zinc-400 space-y-1">
                    <p>{new Date(event.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}</p>
                    {event.time && <p>⏰ {event.time}</p>}
                    {event.assignedTo && <p>👤 {event.assignedTo}</p>}
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <p className="text-zinc-400 text-sm text-center py-4">
                  No hay eventos próximos
                </p>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Proyectos Activos</span>
                <span className="text-white font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Eventos Este Mes</span>
                <span className="text-white font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Entregas Pendientes</span>
                <span className="text-yellow-400 font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Esta Semana</span>
                <span className="text-blue-400 font-medium">{upcomingEvents.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false)
          setSelectedEvent(null)
        }}
        title="Detalles del Evento"
        size="md"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedEvent.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="info" size="sm">
                  {getEventTypeLabel(selectedEvent.type)}
                </Badge>
                {getPriorityBadge(selectedEvent.priority)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300">
                  {new Date(selectedEvent.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {selectedEvent.time && (
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">⏰</span>
                  <span className="text-zinc-300">{selectedEvent.time}</span>
                </div>
              )}

              {selectedEvent.assignedTo && (
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">👤</span>
                  <span className="text-zinc-300">{selectedEvent.assignedTo}</span>
                </div>
              )}

              {selectedEvent.projectTitle && (
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">📁</span>
                  <span className="text-zinc-300">{selectedEvent.projectTitle}</span>
                </div>
              )}
            </div>

            {selectedEvent.description && (
              <div className="border-t border-zinc-700/50 pt-4">
                <h4 className="text-white font-medium mb-2">Descripción</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEventModal(false)
                  setSelectedEvent(null)
                }}
              >
                Cerrar
              </Button>
              {selectedEvent.projectId && (
                <Button>
                  Ver Proyecto
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CalendarPage