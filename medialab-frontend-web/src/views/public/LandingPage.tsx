import { useNavigate } from 'react-router-dom'
import { Film, ArrowRight, Users, Briefcase, Package } from 'lucide-react'

const LandingPage = (): React.JSX.Element => {
  const navigate = useNavigate()

  const handleLoginClick = (): void => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Medialab</h1>
              <p className="text-xs text-slate-400">Universidad Galileo</p>
            </div>
          </div>
          
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            <span>Acceder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sistema de Gestión
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {' '}Medialab
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Plataforma integral para la gestión de proyectos audiovisuales, inventario, usuarios y solicitudes de servicios.
            </p>
            
            <button
              onClick={handleLoginClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/25"
            >
              Comenzar
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Gestión de Proyectos</h3>
              <p className="text-slate-400">
                Administra y da seguimiento a todos los proyectos audiovisuales del departamento.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Control de Inventario</h3>
              <p className="text-slate-400">
                Mantén el control completo del equipo audiovisual y recursos del departamento.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Gestión de Usuarios</h3>
              <p className="text-slate-400">
                Administra usuarios, clientes y solicitudes de servicios de manera eficiente.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-white/10">
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            © 2025 Medialab - Universidad Galileo. Sistema interno de gestión.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage