import AppRouter from './AppRouter'
import { AuthProvider } from '@/modules/auth/context/AuthContext'
import '@/styles/index.css'

const App = (): React.JSX.Element => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App