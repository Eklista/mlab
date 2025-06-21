// src/views/admin/courses/CoursesPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  BookOpen,
  Users,
  Calendar,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  Badge,
  StatCard,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/core/components/ui'

interface Career {
  id: string
  name: string
  code: string
  courses: number
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
}

const CoursesPage = () => {
  const navigate = useNavigate()
  const [selectedCareer, setSelectedCareer] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Mock data - Carreras
  const careers: Career[] = [
    { id: '1', name: 'Ingeniería en Sistemas', code: 'INGS', courses: 8 },
    { id: '2', name: 'Medicina', code: 'MED', courses: 12 },
    { id: '3', name: 'Derecho', code: 'DER', courses: 6 },
    { id: '4', name: 'Comunicación', code: 'COM', courses: 5 },
    { id: '5', name: 'Administración', code: 'ADM', courses: 7 }
  ]

  // Mock data - Cursos
  const courses: Course[] = [
    {
      id: '1',
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
      students: 45
    },
    {
      id: '2',
      name: 'Anatomía Humana I',
      code: 'MED-201',
      careerCode: 'MED',
      careerName: 'Medicina',
      professor: 'Dra. Ana Martínez',
      semester: '2do Semestre',
      year: 2025,
      totalClasses: 24,
      completedClasses: 24,
      status: 'completed',
      startDate: '2025-01-15',
      endDate: '2025-05-30',
      students: 32
    },
    {
      id: '3',
      name: 'Bases de Datos Avanzadas',
      code: 'INGS-401',
      careerCode: 'INGS',
      careerName: 'Ingeniería en Sistemas',
      professor: 'Ing. Carlos López',
      semester: '4to Semestre',
      year: 2025,
      totalClasses: 14,
      completedClasses: 0,
      status: 'planning',
      startDate: '2025-08-01',
      endDate: '2025-12-15',
      students: 28
    },
    {
      id: '4',
      name: 'Derecho Constitucional',
      code: 'DER-301',
      careerCode: 'DER',
      careerName: 'Derecho',
      professor: 'Lic. María González',
      semester: '3er Semestre',
      year: 2025,
      totalClasses: 18,
      completedClasses: 12,
      status: 'in-progress',
      startDate: '2025-01-15',
      endDate: '2025-05-30',
      students: 38
    }
  ]

  // Estadísticas
  const stats = [
    {
      title: 'Total Cursos',
      value: courses.length.toString(),
      change: '+12%',
      trend: 'up' as const,
      icon: <BookOpen className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'En Progreso',
      value: courses.filter(c => c.status === 'in-progress').length.toString(),
      change: '+5%',
      trend: 'up' as const,
      icon: <Calendar className="w-5 h-5 text-yellow-400" />
    },
    {
      title: 'Estudiantes Total',
      value: courses.reduce((sum, c) => sum + c.students, 0).toString(),
      change: '+8%',
      trend: 'up' as const,
      icon: <Users className="w-5 h-5 text-green-400" />
    }
  ]

  // Filtrar cursos
  const filteredCourses = courses.filter(course => {
    const matchesCareer = !selectedCareer || course.careerCode === selectedCareer
    const matchesSearch = !searchTerm || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCareer && matchesSearch
  })

  const getStatusBadge = (status: Course['status']) => {
    const variants = {
      planning: 'info',
      'in-progress': 'warning',
      completed: 'success',
      'on-hold': 'secondary'
    } as const

    const labels = {
      planning: 'Planificación',
      'in-progress': 'En Progreso',
      completed: 'Completado',
      'on-hold': 'En Pausa'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const handleDeleteCourse = () => {
    setShowDeleteModal(false)
    setSelectedCourse(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Gestión de Cursos
          </h1>
          <p className="text-zinc-400">
            Administración de cursos por carrera y clases
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/admin/courses/create')}
        >
          Nuevo Curso
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar cursos, códigos o profesores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            placeholder="Filtrar por carrera"
            value={selectedCareer}
            onChange={(value) => setSelectedCareer(value.toString())}
            options={[
              { value: '', label: 'Todas las carreras' },
              ...careers.map(career => ({
                value: career.code,
                label: `${career.name} (${career.code})`
              }))
            ]}
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Más Filtros
          </Button>
        </div>
      </Card>

      {/* Courses Table */}
      <Card padding="none">
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              <TableHead>Curso</TableHead>
              <TableHead>Profesor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Estudiantes</TableHead>
              <TableHead>Semestre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <h4 className="font-medium text-white">{course.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" size="sm">{course.code}</Badge>
                      <span className="text-sm text-zinc-400">{course.careerName}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{course.professor}</span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(course.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-700 rounded-full h-2 max-w-20">
                      <div 
                        className="bg-gradient-to-r from-stone-50 to-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(course.completedClasses / course.totalClasses) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-zinc-400 min-w-[3rem]">
                      {course.completedClasses}/{course.totalClasses}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{course.students}</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-300">{course.semester} {course.year}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Edit className="w-4 h-4" />}
                      onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedCourse(course)
                        setShowDeleteModal(true)
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-zinc-300">
            ¿Estás seguro de que deseas eliminar el curso{' '}
            <span className="font-semibold text-white">
              "{selectedCourse?.name}"
            </span>?
          </p>
          <p className="text-sm text-zinc-400">
            Esta acción eliminará también todas las clases y tareas asociadas.
          </p>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteCourse}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CoursesPage