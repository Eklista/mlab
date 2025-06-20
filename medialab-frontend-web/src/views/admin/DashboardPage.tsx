import { 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal, 
  Calendar,
  Star,
  Camera,
  Users,
  Award,
  Gift,
  Bell,
  AlertCircle,
  CheckCircle,
  Video,
  Mic
} from 'lucide-react'

const DashboardPage = (): React.JSX.Element => {
  const mainStat = {
    title: 'Proyectos Completados',
    value: '47',
    change: '+23%',
    trend: 'up' as const,
    subtitle: 'Este semestre vs semestre anterior - +9 proyectos adicionales'
  }

  const stats = [
    {
      title: 'Solicitudes Pendientes',
      value: '12',
      change: '+16%',
      trend: 'up' as const,
      icon: <Video className="w-5 h-5" />
    },
    {
      title: 'Equipos Disponibles', 
      value: '15/18',
      change: '+8%',
      trend: 'up' as const,
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: 'Estudiantes Activos',
      value: '89', 
      change: '-3%',
      trend: 'down' as const,
      icon: <Users className="w-5 h-5" />
    }
  ]

  // Colaborador del mes
  const employeeOfMonth = {
    name: 'Prof. Ana Martínez',
    role: 'Coordinadora de Producción',
    avatar: 'AM',
    projects: 12,
    rating: 4.9,
    achievement: 'Mayor colaboración interdisciplinaria'
  }

  // Próximos cumpleaños
  const upcomingBirthdays = [
    {
      name: 'Dr. Roberto Silva',
      date: 'Hoy',
      avatar: 'RS',
      role: 'Director Académico'
    },
    {
      name: 'María González',
      date: 'Mañana',
      avatar: 'MG',
      role: 'Asistente de Producción'
    },
    {
      name: 'Ing. Carlos López',
      date: '3 días',
      avatar: 'CL',
      role: 'Técnico en Audio'
    },
    {
      name: 'Lic. Andrea Morales',
      date: '5 días',
      avatar: 'AM',
      role: 'Coordinadora'
    }
  ]

  // Actividades recientes
  const recentActivities = [
    {
      id: 1,
      type: 'project_completed',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      title: 'Proyecto de Tesis Completado',
      subtitle: 'Estudiante: María García - Documental "Historia USAC"',
      time: '10:30',
      status: 'success'
    },
    {
      id: 2,
      type: 'equipment_issue',
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
      title: 'Equipo Requiere Mantenimiento',
      subtitle: 'Canon EOS R5 #001 - Revisión programada',
      time: '09:15',
      status: 'warning'
    },
    {
      id: 3,
      type: 'new_request',
      icon: <Bell className="w-5 h-5 text-blue-400" />,
      title: 'Nueva Solicitud de Facultad',
      subtitle: 'Medicina - Video promocional para postgrados',
      time: '08:45',
      status: 'info'
    },
    {
      id: 4,
      type: 'recording_session',
      icon: <Mic className="w-5 h-5 text-purple-400" />,
      title: 'Sesión de Grabación Programada',
      subtitle: 'Estudio A - Cátedra magistral Dr. Pérez',
      time: '07:30',
      status: 'active'
    }
  ]

  // Próximos eventos del calendario
  const upcomingEvents = [
    {
      title: 'Defensa de Tesis',
      time: '14:00',
      client: 'Comunicación - Juan Pérez',
      status: 'confirmed'
    },
    {
      title: 'Reunión de Coordinación',
      time: '16:30', 
      client: 'Equipo Producción',
      status: 'pending'
    },
    {
      title: 'Grabación Cátedra',
      time: '18:00',
      client: 'Derecho - Clase magistral',
      status: 'urgent'
    }
  ]

  const chartData = [420, 445, 330, 380, 440, 350, 380, 420, 450, 380, 350, 420]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Centro de Producción Audiovisual</h1>
          <p className="text-zinc-400">Dashboard del departamento universitario</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors text-sm">
            <Calendar className="w-4 h-4 inline mr-2" />
            Hoy
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-stone-50 to-white text-zinc-900 rounded-xl hover:scale-105 transition-all duration-300 text-sm font-medium">
            Nueva Solicitud
          </button>
        </div>
      </div>

      {/* Estadística principal */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-700/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {mainStat.value}
                <span className="text-sm font-normal text-zinc-400 ml-2">proyectos</span>
              </h2>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">{mainStat.change}</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {mainStat.subtitle}
            </p>
          </div>

          <div className="relative h-32">
            <div className="absolute inset-0 flex items-end justify-between gap-1">
              {chartData.map((value, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-t from-stone-100/20 to-stone-50/40 rounded-t-sm flex-1 transition-all duration-500 hover:from-stone-50/30 hover:to-white/50"
                  style={{ height: `${(value / Math.max(...chartData)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:bg-zinc-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  {stat.icon}
                </div>
                <h3 className="text-zinc-400 text-sm font-medium">{stat.title}</h3>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat.trend === 'up' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grid de secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colaborador del mes */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Colaborador del Mes</h2>
          </div>
          
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center text-2xl font-bold text-zinc-900">
                {employeeOfMonth.avatar}
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{employeeOfMonth.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{employeeOfMonth.role}</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{employeeOfMonth.projects}</p>
                <p className="text-xs text-zinc-400">Colaboraciones</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{employeeOfMonth.rating}</p>
                <p className="text-xs text-zinc-400">Evaluación</p>
              </div>
            </div>
            
            <div className="mt-4 px-3 py-2 bg-zinc-800/50 rounded-lg">
              <p className="text-sm text-zinc-300">{employeeOfMonth.achievement}</p>
            </div>
          </div>
        </div>

        {/* Próximos cumpleaños */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Próximos Cumpleaños</h2>
          </div>
          
          <div className="space-y-3">
            {upcomingBirthdays.map((person, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-stone-50 to-white rounded-full flex items-center justify-center text-sm font-bold text-zinc-900">
                  {person.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{person.name}</h4>
                  <p className="text-zinc-400 text-xs">{person.role}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  person.date === 'Hoy' ? 'bg-pink-500/20 text-pink-300' :
                  person.date === 'Mañana' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-zinc-700 text-zinc-300'
                }`}>
                  {person.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario de hoy */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Agenda de Hoy</h2>
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors">
                <div className={`w-3 h-3 rounded-full ${
                  event.status === 'confirmed' ? 'bg-emerald-400' :
                  event.status === 'pending' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm">{event.title}</h4>
                  <p className="text-zinc-400 text-xs truncate">{event.client}</p>
                </div>
                <span className="text-xs text-zinc-400">{event.time}</span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            Ver calendario completo
          </button>
        </div>

        {/* Actividades recientes */}
        <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50">
          <div className="p-6 border-b border-zinc-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Actividad Reciente</h2>
                  <p className="text-sm text-zinc-400">Últimas actualizaciones del sistema</p>
                </div>
              </div>
              <button className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-zinc-800/30 rounded-lg transition-colors">
                  <div className="mt-0.5">
                    {activity.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm">{activity.title}</h4>
                    <p className="text-zinc-400 text-xs mt-1">{activity.subtitle}</p>
                  </div>
                  
                  <span className="text-xs text-zinc-500 mt-1">{activity.time}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              Ver todas las actividades
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage