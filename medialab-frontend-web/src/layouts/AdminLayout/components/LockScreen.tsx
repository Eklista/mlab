// src/layouts/AdminLayout/components/LockScreen.tsx
import { useState } from 'react'
import { Lock } from 'lucide-react'

interface LockScreenProps {
  onUnlock: () => void
}

const LockScreen = ({ onUnlock }: LockScreenProps): React.JSX.Element => {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (password) {
      onUnlock()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Lock className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Sesión Bloqueada</h1>
          <p className="text-gray-400">Ingresa tu contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none mb-4"
            autoFocus
          />
          
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded font-medium transition-colors"
          >
            Desbloquear
          </button>
        </form>
      </div>
    </div>
  )
}

export default LockScreen