// src/views/admin/courses/CourseDetailPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal,
  Calendar,
  User,
  Users,
  Clock,
  BookOpen,
  PlayCircle,
  Plus,
  Eye,
  Camera,
  Mic,
  Video,
  Settings
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Badge,
  Modal,
  StatCard
} from '@/core/components/ui'

interface CourseClass {
  id: string
  number: number
  title: string
  description: string
  duration: number // minutes
  date: string
  time: string
  status: 'pending' | 'recorded' | 'edited' | 'published'
  location: string
  assignedTasks: {
    camarografo?: string[]
    editor?: string[]
    audio?: string[]
    streaming?: string[]
  }
  recordings?: {
    raw?: string
    edited?: string
    published?: string
  }
}

interface Course {
  id: string
  name: string
  code: string
  careerCode: string
  careerName: string
  professor: string
  semester: string
  year: number
  totalClasses: number
  completedClasses: number
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  startDate: string
  endDate: string
  students: number
  description: string
  schedule: string
  location: string
  classes: CourseClass[]
}

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddClassModal, setShowAddClassModal] = useState(false)

  // Mock data del curso
  const course: Course = {
    id: courseId || '1',
    name: 'Fundamentos de Programación',
    code: 'INGS-101',
    careerCode: 'INGS',
    careerName: 'Ingeniería en Sistemas',
    professor: 'Dr. Roberto Silva',
    semester: '1er Semestre',
    year: 2025,
    totalClasses: 16,
    completedClasses: 8,
    status: 'in-progress',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    students: 45,
    description: 'Curso introductorio a los conceptos fundamentales de programación, algoritmos y estructuras de datos.',
    schedule: 'Lunes y Miércoles 14:00-16:00',
    location: 'Laboratorio de Computación A-201',
    classes: [
      {
        id: '1',
        number: 1,
        title: 'Introducción a la Programación',
        description: 'Conceptos básicos, historia y paradigmas de programación',
        duration: 120,
        date: '2025-01-15',
        time: '14:00',
        status: 'published',
        location: 'Lab A-201',
        assignedTasks: {
          camarografo: ['Carlos López'],
          editor: ['Ana García'],
          audio: ['Roberto Méndez']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_1',
          edited: 'https://drive.google.com/edited_1',
          published: 'https://youtube.com/watch?v=123'
        }
      },
      {
        id: '2',
        number: 2,
        title: 'Variables y Tipos de Datos',
        description: 'Declaración de variables, tipos primitivos y operadores',
        duration: 120,
        date: '2025-01-17',
        time: '14:00',
        status: 'edited',
        location: 'Lab A-201',
        assignedTasks: {
          camarografo: ['Carlos López', 'Miguel Torres'],
          editor: ['Ana García'],
          audio: ['Roberto Méndez']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_2',
          edited: 'https://drive.google.com/edited_2'
        }
      },
      {
        id: '3',
        number: 3,
        title: 'Estructuras de Control',
        description: 'Condicionales, bucles y control de flujo',
        duration: 120,
        date: '2025-01-20',
        time: '14:00',
        status: 'recorded',
        location: 'Lab A-201',
        assignedTasks: {
          camarografo: ['Carlos López'],
          editor: ['Ana García'],
          streaming: ['Tech Support']
        },
        recordings: {
          raw: 'https://drive.google.com/raw_3'
        }
      },
      {
        id: '4',
        number: 4,
        title: 'Funciones y Modularidad',
        description: 'Definición de funciones, parámetros y alcance de variables',
        duration: 120,
        date: '2025-01-22',
        time: '14:00',
        status: 'pending',
        location: 'Lab A-201',
        assignedTasks: {
          camarografo: ['Miguel Torres'],
          editor: ['Juan Pérez']
        }
      }
    ]
  }

  const stats = [
    {
      title: 'Clases Totales',
      value: course.totalClasses.toString(),
      subtitle: 'Planificadas para el semestre',
      icon: <BookOpen className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Clases Grabadas',
      value: course.classes.filter(c => ['recorded', 'edited', 'published'].includes(c.status)).length.toString(),
      subtitle: 'Con material audiovisual',
      icon: <Video className="w-5 h-5 text-green-400" />
    },
    {
      title: 'Estudiantes',
      value: course.students.toString(),
      subtitle: 'Matriculados en el curso',
      icon: <Users className="w-5 h-5 text-purple-400" />
    }
  ]

  const getClassStatusBadge = (status: CourseClass['status']) => {
    const variants = {
      pending: 'secondary',
      recorded: 'warning',
      edited: 'info',
      published: 'success'
    } as const

    const labels = {
      pending: 'Pendiente',
      recorded: 'Grabada',
      edited: 'Editada',
      published: 'Publicada'
    }

    return (
      <Badge variant={variants[status]} size="sm">
        {labels[status]}
      </Badge>
    )
  }

  const getTaskIcon = (taskType: string) => {
    const icons = {
      camarografo: <Camera className="w-4 h-4" />,
      editor: <Edit className="w-4 h-4" />,
      audio: <Mic className="w-4 h-4" />,
      streaming: <PlayCircle className="w-4 h-4" />
    }
    return icons[taskType as keyof typeof icons] || <Settings className="w-4 h-4" />
  }

  const handleDeleteCourse = () => {
    setShowDeleteModal(false)
    navigate('/admin/courses')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/admin/courses')}
        >
          Volver a Cursos
        </Button>
      </div>

      {/* Course Header */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {course.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" size="sm">{course.code}</Badge>
                  <span className="text-zinc-400">{course.careerName}</span>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-300 leading-relaxed mb-4">
              {course.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Profesor:</span>
                <p className="text-white font-medium">{course.professor}</p>
              </div>
              <div>
                <span className="text-zinc-400">Horario:</span>
                <p className="text-white font-medium">{course.schedule}</p>
              </div>
              <div>
                <span className="text-zinc-400">Ubicación:</span>
                <p className="text-white font-medium">{course.location}</p>
              </div>
              <div>
                <span className="text-zinc-400">Semestre:</span>
                <p className="text-white font-medium">{course.semester} {course.year}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<MoreHorizontal className="w-4 h-4" />}
              onClick={() => setShowDeleteModal(true)}
            >
              Opciones
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Classes List */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Clases del Curso
          </h3>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddClassModal(true)}
          >
            Programar Clase
          </Button>
        </div>

        <div className="space-y-4">
          {course.classes.map((classItem) => (
            <div key={classItem.id} className="border border-zinc-700/50 rounded-lg p-4 hover:bg-zinc-800/30 transition-colors">
              {/* Class Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-blue-400">#{classItem.number}</span>
                    <h4 className="font-medium text-white">{classItem.title}</h4>
                    {getClassStatusBadge(classItem.status)}
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{classItem.description}</p>
                  <div className="flex items-center gap-6 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(classItem.date).toLocaleDateString()} - {classItem.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {classItem.duration} min
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {classItem.location}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="w-4 h-4" />}
                  onClick={() => navigate(`/admin/courses/${course.id}/classes/${classItem.id}`)}
                >
                  Ver Detalle
                </Button>
              </div>

              {/* Assigned Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(classItem.assignedTasks).map(([taskType, assignees]) => (
                  assignees && assignees.length > 0 && (
                    <div key={taskType} className="bg-zinc-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {getTaskIcon(taskType)}
                        <span className="text-xs font-medium text-zinc-300 capitalize">
                          {taskType === 'camarografo' ? 'Camarógrafos' : 
                           taskType === 'editor' ? 'Editores' :
                           taskType === 'audio' ? 'Audio' : 'Streaming'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {assignees.map((assignee, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {assignee}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Recordings Links */}
              {classItem.recordings && Object.keys(classItem.recordings).length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-700/50">
                  <h5 className="text-sm font-medium text-zinc-300 mb-2">Grabaciones:</h5>
                  <div className="flex flex-wrap gap-2">
                    {classItem.recordings.raw && (
                      <a 
                        href={classItem.recordings.raw} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-2 py-1 rounded transition-colors"
                      >
                        📹 Raw
                      </a>
                    )}
                    {classItem.recordings.edited && (
                      <a 
                        href={classItem.recordings.edited} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded transition-colors"
                      >
                        ✂️ Editado
                      </a>
                    )}
                    {classItem.recordings.published && (
                      <a 
                        href={classItem.recordings.published} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded transition-colors"
                      >
                        🚀 Publicado
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Opciones del Curso"
        size="sm"
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            leftIcon={<Edit className="w-4 h-4" />}
            onClick={() => {
              setShowDeleteModal(false)
              navigate(`/admin/courses/${course.id}/edit`)
            }}
          >
            Editar Curso
          </Button>
          <Button
            variant="danger"
            className="w-full justify-start"
            onClick={handleDeleteCourse}
          >
            Eliminar Curso
          </Button>
        </div>
      </Modal>

      {/* Add Class Modal */}
      <Modal
        isOpen={showAddClassModal}
        onClose={() => setShowAddClassModal(false)}
        title="Programar Nueva Clase"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            Funcionalidad para programar nuevas clases en desarrollo...
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAddClassModal(false)}
            >
              Cancelar
            </Button>
            <Button>
              Programar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CourseDetailPage