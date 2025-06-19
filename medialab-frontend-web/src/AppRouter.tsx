// src/AppRouter.tsx - Actualizado para usar el nuevo AdminLayout
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/context/AuthContext'
import LandingPage from '@/views/public/LandingPage'
import LoginPage from '@/views/auth/LoginPage'
import DashboardPage from '@/views/admin/DashboardPage'
import ClientDashboardPage from '@/views/client/ClientDashboardPage'
import AdminLayout from '@/layouts/AdminLayout/AdminLayout'
import ClientLayout from '@/layouts/ClientLayout/ClientLayout'

const AppRouter = (): React.JSX.Element => {
  const { isAuthenticated, user } = useAuth()

  // Protected Route Component
  const ProtectedRoute = ({ 
    children, 
    allowedRoles 
  }: { 
    children: React.ReactNode
    allowedRoles?: string[] 
  }): React.JSX.Element => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
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
        
        {/* Admin Routes - Usando el nuevo AdminLayout */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="calendar" element={<div>Calendario Admin</div>} />
                  <Route path="projects/*" element={<div>Proyectos Admin</div>} />
                  <Route path="inventory/*" element={<div>Inventario Admin</div>} />
                  <Route path="users/*" element={<div>Usuarios Admin</div>} />
                  <Route path="requests/*" element={<div>Solicitudes Admin</div>} />
                  <Route path="settings" element={<div>Configuración Admin</div>} />
                  <Route path="notifications" element={<div>Notificaciones Admin</div>} />
                  {/* Redirect por defecto al dashboard */}
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Client Routes */}
        <Route 
          path="/client/*" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <Routes>
                  <Route path="dashboard" element={<ClientDashboardPage />} />
                  <Route path="projects" element={<div>Mis Proyectos</div>} />
                  <Route path="requests" element={<div>Mis Solicitudes</div>} />
                  {/* Redirect por defecto al dashboard */}
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ClientLayout>
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