// src/views/admin/projects/components/CourseSpecificSections.tsx
import { BookOpen, Play, Users, Monitor, Calendar, FileText } from 'lucide-react'
import { Card, Badge } from '@/core/components/ui'

interface Project {
  id: string
  title: string
  type: string
  duration?: string
  platform?: string
  [key: string]: any
}

interface CourseSpecificSectionsProps {
  project: Project
}

const CourseSpecificSections = ({ project }: CourseSpecificSectionsProps) => {
  // Mock data específico para cursos
  const modules = [
    {
      number: 1,
      title: 'Introducción a la Medicina Moderna',
      duration: '2:30:00',
      lessons: 8,
      status: 'completed',
      description: 'Fundamentos básicos y conceptos clave de la medicina contemporánea'
    },
    {
      number: 2,
      title: 'Diagnóstico y Procedimientos',
      duration: '3:15:00',
      lessons: 12,
      status: 'in-production',
      description: 'Técnicas de diagnóstico y procedimientos médicos esenciales'
    },
    {
      number: 3,
      title: 'Tratamientos Avanzados',
      duration: '2:45:00',
      lessons: 10,
      status: 'planned',
      description: 'Metodologías avanzadas de tratamiento y casos clínicos'
    },
    {
      number: 4,
      title: 'Ética y Práctica Profesional',
      duration: '1:30:00',
      lessons: 6,
      status: 'planned',
      description: 'Aspectos éticos y buenas prácticas en la medicina'
    }
  ]

  const courseDetails = {
    totalDuration: '10:00:00',
    totalModules: 4,
    totalLessons: 36,
    targetAudience: 'Estudiantes de Medicina',
    level: 'Intermedio',
    language: 'Español',
    certification: 'Sí'
  }

  const resources = [
    {
      type: 'PDF',
      name: 'Manual del Estudiante',
      size: '15.2 MB',
      status: 'ready'
    },
    {
      type: 'Video',
      name: 'Videos complementarios',
      size: '2.1 GB',
      status: 'in-progress'
    },
    {
      type: 'Quiz',
      name: 'Evaluaciones por módulo',
      size: '12 preguntas c/u',
      status: 'pending'
    },
    {
      type: 'Slides',
      name: 'Presentaciones PowerPoint',
      size: '45.8 MB',
      status: 'ready'
    }
  ]

  const instructors = [
    {
      name: 'Dr. Roberto Silva',
      role: 'Instructor Principal',
      specialty: 'Medicina Interna',
      modules: [1, 2]
    },
    {
      name: 'Dra. Ana Martínez',
      role: 'Instructora Especialista',
      specialty: 'Cardiología',
      modules: [3]
    },
    {
      name: 'Dr. Carlos López',
      role: 'Instructor Invitado',
      specialty: 'Bioética',
      modules: [4]
    }
  ]

  const getModuleStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      'in-production': 'warning',
      planned: 'info',
      review: 'secondary'
    } as const

    const labels = {
      completed: 'Completado',
      'in-production': 'En Producción',
      planned: 'Planeado',
      review: 'En Revisión'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getResourceStatusBadge = (status: string) => {
    const variants = {
      ready: 'success',
      'in-progress': 'warning',
      pending: 'info',
      review: 'secondary'
    } as const

    const labels = {
      ready: 'Listo',
      'in-progress': 'En Proceso',
      pending: 'Pendiente',
      review: 'En Revisión'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Información del Curso
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{courseDetails.totalModules}</div>
            <div className="text-sm text-zinc-400">Módulos</div>
          </div>
          <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{courseDetails.totalLessons}</div>
            <div className="text-sm text-zinc-400">Lecciones</div>
          </div>
          <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{courseDetails.totalDuration}</div>
            <div className="text-sm text-zinc-400">Duración Total</div>
          </div>
          <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{courseDetails.level}</div>
            <div className="text-sm text-zinc-400">Nivel</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
            <span className="text-zinc-400">Audiencia objetivo</span>
            <span className="text-zinc-300">{courseDetails.targetAudience}</span>
          </div>
          <div className="flex justify-between p-3 bg-zinc-800/30 rounded-lg">
            <span className="text-zinc-400">Idioma</span>
            <span className="text-zinc-300">{courseDetails.language}</span>
          </div>
        </div>
      </Card>

      {/* Course Modules */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5" />
          Módulos del Curso
        </h3>
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.number} className="border border-zinc-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-2">
                    Módulo {module.number}: {module.title}
                  </h4>
                  <p className="text-sm text-zinc-400 mb-3">{module.description}</p>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {module.lessons} lecciones
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {module.duration}
                    </div>
                  </div>
                </div>
                {getModuleStatusBadge(module.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructors */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Instructores
          </h3>
          <div className="space-y-4">
            {instructors.map((instructor, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-zinc-900">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{instructor.name}</h4>
                  <p className="text-sm text-zinc-400">{instructor.role}</p>
                  <p className="text-xs text-zinc-500">{instructor.specialty}</p>
                  <div className="flex gap-1 mt-2">
                    {instructor.modules.map(moduleNum => (
                      <Badge key={moduleNum} variant="secondary" size="sm">
                        Módulo {moduleNum}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Resources */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recursos del Curso
          </h3>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-white text-sm">{resource.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" size="sm">{resource.type}</Badge>
                    <span className="text-xs text-zinc-500">{resource.size}</span>
                  </div>
                </div>
                {getResourceStatusBadge(resource.status)}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Platform Information */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Plataforma de Distribución
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Plataforma LMS</h4>
            <p className="text-sm text-zinc-400">Moodle Universidad Galileo</p>
            <Badge variant="success" size="sm" className="mt-2">Configurado</Badge>
          </div>
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Formato de Video</h4>
            <p className="text-sm text-zinc-400">MP4 - 1080p</p>
            <Badge variant="info" size="sm" className="mt-2">HD Ready</Badge>
          </div>
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Certificación</h4>
            <p className="text-sm text-zinc-400">Certificado digital disponible</p>
            <Badge variant="success" size="sm" className="mt-2">Habilitado</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CourseSpecificSections