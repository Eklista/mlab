// src/views/admin/projects/components/GeneralSpecificSections.tsx
import { Camera, Settings, FileText, Calendar } from 'lucide-react'
import { Card, Badge } from '@/core/components/ui'

interface Project {
  id: string
  title: string
  type: string
  equipment?: string[]
  [key: string]: any
}

interface GeneralSpecificSectionsProps {
  project: Project
}

const GeneralSpecificSections = ({ project }: GeneralSpecificSectionsProps) => {
  // Mock data específico para proyectos generales
  const productionPhases = [
    {
      phase: 'Pre-producción',
      status: 'completed',
      tasks: [
        { name: 'Reunión con cliente', completed: true },
        { name: 'Desarrollo de concepto', completed: true },
        { name: 'Storyboard', completed: true },
        { name: 'Cronograma', completed: true }
      ]
    },
    {
      phase: 'Producción',
      status: 'in-progress',
      tasks: [
        { name: 'Configuración de equipo', completed: true },
        { name: 'Grabación principal', completed: false },
        { name: 'Grabación B-roll', completed: false },
        { name: 'Entrevistas', completed: false }
      ]
    },
    {
      phase: 'Post-producción',
      status: 'pending',
      tasks: [
        { name: 'Edición principal', completed: false },
        { name: 'Corrección de color', completed: false },
        { name: 'Audio mixing', completed: false },
        { name: 'Revisión final', completed: false }
      ]
    }
  ]

  const deliverables = [
    {
      name: 'Video principal (4K)',
      format: 'MP4',
      status: 'in-progress',
      description: 'Video promocional completo en resolución 4K'
    },
    {
      name: 'Video para redes sociales',
      format: 'MP4',
      status: 'pending',
      description: 'Versión optimizada para Instagram y Facebook (1:1)'
    },
    {
      name: 'Fotografías promocionales',
      format: 'JPG',
      status: 'pending',
      description: 'Set de 10-15 fotografías en alta resolución'
    },
    {
      name: 'Material gráfico',
      format: 'PNG/AI',
      status: 'pending',
      description: 'Logos, títulos y elementos gráficos utilizados'
    }
  ]

  const getPhaseStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      'in-progress': 'warning',
      pending: 'secondary'
    } as const

    const labels = {
      completed: 'Completado',
      'in-progress': 'En Progreso',
      pending: 'Pendiente'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getDeliverableStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      'in-progress': 'warning',
      pending: 'secondary'
    } as const

    const labels = {
      completed: 'Listo',
      'in-progress': 'En Proceso',
      pending: 'Pendiente'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Equipment Section */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Equipo Utilizado
        </h3>
        <div className="space-y-3">
          {project.equipment?.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
              <Settings className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-300">{item}</span>
              <Badge variant="success" size="sm">Disponible</Badge>
            </div>
          )) || (
            <p className="text-zinc-400 text-sm">No se ha especificado equipo</p>
          )}
        </div>
      </Card>

      {/* Production Phases */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Fases de Producción
        </h3>
        <div className="space-y-4">
          {productionPhases.map((phase, index) => (
            <div key={index} className="border border-zinc-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{phase.phase}</h4>
                {getPhaseStatusBadge(phase.status)}
              </div>
              <div className="space-y-2">
                {phase.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-zinc-600'
                    }`}>
                      {task.completed && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={task.completed ? 'text-zinc-300' : 'text-zinc-400'}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Deliverables */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Entregables del Proyecto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliverables.map((deliverable, index) => (
            <div key={index} className="border border-zinc-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{deliverable.name}</h4>
                {getDeliverableStatusBadge(deliverable.status)}
              </div>
              <p className="text-sm text-zinc-400 mb-2">{deliverable.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">{deliverable.format}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default GeneralSpecificSections