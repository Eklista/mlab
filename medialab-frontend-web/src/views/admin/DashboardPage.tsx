import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import { FolderOpen, Package, Users, UserCheck } from 'lucide-react'

const DashboardPage = (): React.JSX.Element => {
  const stats = [
    {
      title: 'Proyectos Activos',
      value: '12',
      icon: <FolderOpen className="w-8 h-8 text-purple-600" />,
      change: '+2 este mes',
      changeType: 'positive' as const
    },
    {
      title: 'Equipos Disponibles',
      value: '89',
      icon: <Package className="w-8 h-8 text-blue-600" />,
      change: '3 en mantenimiento',
      changeType: 'neutral' as const
    },
    {
      title: 'Usuarios Activos',
      value: '45',
      icon: <Users className="w-8 h-8 text-green-600" />,
      change: '+5 este mes',
      changeType: 'positive' as const
    },
    {
      title: 'Solicitudes Pendientes',
      value: '8',
      icon: <UserCheck className="w-8 h-8 text-orange-600" />,
      change: '2 urgentes',
      changeType: 'warning' as const
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">¡Bienvenido de vuelta!</h2>
          <p className="text-purple-100">
            Aquí tienes un resumen rápido de la actividad en Medialab
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proyectos Recientes</h3>
            <div className="space-y-3">
              {[
                { name: 'Video Institucional 2025', status: 'En Progreso', progress: 75 },
                { name: 'Campaña Redes Sociales', status: 'Revisión', progress: 90 },
                { name: 'Podcast Semanal #23', status: 'Completado', progress: 100 }
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-purple-600 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              {[
                { action: 'Nuevo proyecto creado', time: 'Hace 2 horas', user: 'Juan Pérez' },
                { action: 'Equipo devuelto', time: 'Hace 4 horas', user: 'María García' },
                { action: 'Solicitud aprobada', time: 'Hace 6 horas', user: 'Sistema' },
                { action: 'Usuario registrado', time: 'Ayer', user: 'Ana López' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage