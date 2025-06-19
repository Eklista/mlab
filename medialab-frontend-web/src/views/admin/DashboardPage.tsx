// src/views/admin/DashboardPage.tsx - Actualizada para el nuevo layout
import { FolderOpen, Package, Users, UserCheck, TrendingUp, AlertCircle } from 'lucide-react'

const DashboardPage = (): React.JSX.Element => {
  const stats = [
    {
      title: 'Proyectos Activos',
      value: '12',
      icon: <FolderOpen className="w-6 h-6 text-purple-600" />,
      change: '+2 este mes',
      changeType: 'positive' as const,
      trend: '+16.7%'
    },
    {
      title: 'Equipos Disponibles',
      value: '89',
      icon: <Package className="w-6 h-6 text-blue-600" />,
      change: '3 en mantenimiento',
      changeType: 'neutral' as const,
      trend: '-3.4%'
    },
    {
      title: 'Usuarios Activos',
      value: '45',
      icon: <Users className="w-6 h-6 text-green-600" />,
      change: '+5 este mes',
      changeType: 'positive' as const,
      trend: '+12.5%'
    },
    {
      title: 'Solicitudes Pendientes',
      value: '8',
      icon: <UserCheck className="w-6 h-6 text-orange-600" />,
      change: '2 urgentes',
      changeType: 'warning' as const,
      trend: '+25%'
    }
  ]

  const recentProjects = [
    { 
      name: 'Video Institucional 2025', 
      status: 'En Progreso', 
      progress: 75, 
      client: 'Departamento Marketing',
      deadline: '2 días'
    },
    { 
      name: 'Campaña Redes Sociales', 
      status: 'Revisión', 
      progress: 90,
      client: 'Rectoría',
      deadline: '1 semana'
    },
    { 
      name: 'Podcast Semanal #23', 
      status: 'Completado', 
      progress: 100,
      client: 'Comunicaciones',
      deadline: 'Entregado'
    },
    { 
      name: 'Sesión Fotos Graduación', 
      status: 'Planificación', 
      progress: 25,
      client: 'Registro Académico',
      deadline: '2 semanas'
    }
  ]

  const recentActivity = [
    { 
      action: 'Nuevo proyecto creado', 
      time: 'Hace 2 horas', 
      user: 'Juan Pérez',
      type: 'create'
    },
    { 
      action: 'Equipo devuelto', 
      time: 'Hace 4 horas', 
      user: 'María García',
      type: 'return'
    },
    { 
      action: 'Solicitud aprobada', 
      time: 'Hace 6 horas', 
      user: 'Sistema',
      type: 'approve'
    },
    { 
      action: 'Usuario registrado', 
      time: 'Ayer', 
      user: 'Ana López',
      type: 'user'
    },
    { 
      action: 'Mantenimiento programado', 
      time: 'Ayer', 
      user: 'Carlos Ruiz',
      type: 'maintenance'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return '📝'
      case 'return': return '📦'
      case 'approve': return '✅'
      case 'user': return '👤'
      case 'maintenance': return '🔧'
      default: return '📋'
    }
  }

  const alerts = [
    {
      type: 'warning',
      message: 'Cámara Canon EOS R5 #001 necesita mantenimiento',
      action: 'Revisar'
    },
    {
      type: 'info',
      message: 'Stock bajo: Baterías Sony NP-FZ100 (5 unidades)',
      action: 'Reponer'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Alertas importantes */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' 
                  ? 'bg-yellow-50 border-yellow-400' 
                  : 'bg-blue-50 border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className={`h-5 w-5 mr-3 ${
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <p className={`text-sm font-medium ${
                    alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                  }`}>
                    {alert.message}
                  </p>
                </div>
                <button className={`px-3 py-1 rounded text-xs font-medium ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300' 
                    : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                } transition-colors`}>
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
              <div className="flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
            <p className={`text-xs font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' :
              stat.changeType === 'warning' ? 'text-orange-600' :
              'text-gray-500'
            }`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects - Más ancho */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Ver todos
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completado' ? 'bg-green-100 text-green-800' :
                    project.status === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'Revisión' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
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
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Entrega: {project.deadline}</span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-lg mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
              Ver toda la actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage