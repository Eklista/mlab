import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/context/AuthContext'
import { Input, Button, Alert } from '@/modules/auth/components/ui'
import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await login({ email, password })
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-10 mt-2">
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Iniciar Sesión</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          Accede a tu cuenta del sistema de gestión de Medialab
        </p>
      </div>

      {/* Login Form */}
      <div className="space-y-6">
        {error && (
          <Alert 
            type="error" 
            message={error}
            onClose={clearError}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correo electrónico
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@galileo.edu o cliente@galileo.edu"
              className="bg-white/5 border-white/20 focus:border-purple-400 text-white placeholder-gray-500 h-12 text-base"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cualquier contraseña"
              className="bg-white/5 border-white/20 focus:border-purple-400 text-white placeholder-gray-500 h-12 text-base"
              required
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold h-12 text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none"
            isLoading={isLoading}
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        {/* Demo info */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <p className="text-blue-300 text-sm font-medium mb-2">Demo - Usuarios de prueba:</p>
          <div className="text-xs text-blue-200 space-y-1">
            <p><strong>Admin:</strong> admin@galileo.edu</p>
            <p><strong>Cliente:</strong> cliente@galileo.edu</p>
            <p className="text-blue-300 mt-2">Contraseña: cualquiera</p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4 mt-8 pt-6 border-t border-white/10">
          <a 
            href="#" 
            className="block text-gray-400 hover:text-purple-300 text-sm transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </a>
          
          <div className="text-gray-500 text-sm">
            ¿Problemas para acceder?{' '}
            <a 
              href="mailto:soporte@galileo.edu" 
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Contacta soporte
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage