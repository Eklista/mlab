// src/AppRouter.tsx - Actualizado con ProjectsCreatePage
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import LandingPage from '@/views/public/LandingPage'
import LoginPage from '@/views/auth/LoginPage'
import DashboardPage from '@/views/admin/DashboardPage'
import ClientDashboardPage from '@/views/client/ClientDashboardPage'
import ProjectsGeneralPage from '@/views/admin/projects/ProjectsGeneralPage'
import ProjectsCreatePage from '@/views/admin/projects/ProjectsCreatePage'
import ProjectsDetailsPage from '@/views/admin/projects/ProjectDetailsPage'
import CalendarPage from '@/views/admin/CalendarPage'
import CoursesPage from '@/views/admin/courses/CoursesPage'
import CourseDetailPage from '@/views/admin/courses/CourseDetailPage'
import ClassDetailPage from '@/views/admin/courses/ClassDetailPage'
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
        
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="projects/general" element={<ProjectsGeneralPage />} />
                  <Route path="projects/create" element={<ProjectsCreatePage />} />
                  <Route path="projects/:projectId/details" element={<ProjectsDetailsPage />} />
                  <Route path="projects/podcast" element={<div>Proyectos Podcast</div>} />
                  <Route path="projects/courses" element={<CoursesPage />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="courses/:courseId" element={<CourseDetailPage />} />
                  <Route path="courses/:courseId/classes/:classId" element={<ClassDetailPage />} />
                  <Route path="projects/videos" element={<div>Proyectos Videos</div>} />
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