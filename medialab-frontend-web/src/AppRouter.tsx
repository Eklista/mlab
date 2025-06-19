import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/context/AuthContext'
import LandingPage from '@/views/public/LandingPage'
import LoginPage from '@/views/auth/LoginPage'
import DashboardPage from '@/views/admin/DashboardPage'
import ClientDashboardPage from '@/views/client/ClientDashboardPage'

const AppRouter = (): React.JSX.Element => {
  const { isAuthenticated, user } = useAuth()

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }): React.JSX.Element => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'
      return <Navigate to={redirectPath} replace />
    }

    return <>{children}</>
  }

  // Dashboard redirect based on role
  const DashboardRedirect = (): React.JSX.Element => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard redirect */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Client Routes */}
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect based on auth status and role */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? <DashboardRedirect /> : <Navigate to="/" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter