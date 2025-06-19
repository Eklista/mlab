import ClientLayout from '@/layouts/ClientLayout/ClientLayout'
import { FolderOpen, FileText, Clock, CheckCircle } from 'lucide-react'

const ClientDashboardPage = (): React.JSX.Element => {
  const stats = [
    {
      title: 'Proyectos Activos',
      value: '3',
      icon: <FolderOpen className="w-6 h-6 text-purple-600" />,
      description: 'En desarrollo'
    },
    {
      title: 'Solicitudes Pendientes',
      value: '2',
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      description: 'En revisión'
    },
    {
      title: 'Proyectos Completados',
      value: '8',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      description: 'Este año'
    },
    {
      title: 'Total Solicitudes',
      value: '15',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      description: 'Historial completo'
    }
  ]

  const recentProjects = [
    {
      name: 'Video Promocional Q1 2025',
      status: 'En Progreso',
      progress: 75,
      lastUpdate: 'Hace 2 días'
    },
    {
      name: 'Fotografía Institucional',
      status: 'En Revisión',
      progress: 90,
      lastUpdate: 'Hace 1 semana'
    },
    {
      name: 'Material Redes Sociales',
      status: 'En Progreso',
      progress: 45,
      lastUpdate: 'Hace 3 días'
    }
  ]

  const recentRequests = [
    {
      title: 'Edición de video corporativo',
      status: 'Aprobada',
      date: '15 Jun 2025',
      type: 'Edición'
    },
    {
      title: 'Diseño de banner web',
      status: 'En Revisión',
      date: '18 Jun 2025',
      type: 'Diseño'
    },
    {
      title: 'Fotografía de evento',
      status: 'Pendiente',
      date: '19 Jun 2025',
      type: 'Fotografía'
    }
  ]

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Aprobada':
        return 'bg-green-100 text-green-800'
      case 'En Revisión':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pendiente':
        return 'bg-gray-100 text-gray-800'
      case 'En Progreso':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ClientLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido!</h1>
          <p className="text-purple-100">
            Aquí puedes ver el estado de tus proyectos y solicitudes en Medialab
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h3>
              <a href="/client/projects" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Ver todos
              </a>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{project.lastUpdate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Solicitudes Recientes</h3>
              <a href="/client/requests" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Ver todas
              </a>
            </div>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{request.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{request.type}</span>
                    <span>{request.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ClientDashboardPage