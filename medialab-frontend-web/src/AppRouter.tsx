// src/AppRouter.tsx - Con settings arreglado
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
import PodcastsPage from '@/views/admin/podcasts/PodcastsPage'
import PodcastDetailPage from '@/views/admin/podcasts/PodcastDetailPage'
import EpisodeDetailPage from '@/views/admin/podcasts/EpisodeDetailPage'
import InventoryGeneralPage from './views/admin/Inventory/InventoryGeneralPage'
import SuppliesPage from './views/admin/Inventory/SuppliesPage'
import UsersManagementPage from '@/views/admin/users/UsersManagementPage'
import RequestsPage from '@/views/admin/requests/RequestsPage'
import SettingsLayout from '@/layouts/SettingsLayout/SettingsLayout'
import SettingsGeneralPage from '@/views/admin/settings/SettingsGeneralPage'
import EmployeeRolesPage from '@/views/admin/settings/EmployeeRolesPage'
import UserTypesPage from './views/admin/settings/UserTypePage'
import LinkPlatformsPage from './views/admin/settings/LinkPlatformsPage'

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

  // Dashboard redirect based on role - mejorado para persistencia
  const DashboardRedirect = (): React.JSX.Element => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    // Intentar obtener la última ruta guardada
    const lastRoute = localStorage.getItem('medialab_last_route')
    
    if (lastRoute && user) {
      // Verificar que la ruta sea válida para el rol del usuario
      const isValidRoute = lastRoute.includes(`/${user.role}/`)
      if (isValidRoute) {
        return <Navigate to={lastRoute} replace />
      }
    }

    // Fallback a dashboard por defecto
    const defaultPath = user?.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'
    return <Navigate to={defaultPath} replace />
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
                  <Route path="requests" element={<RequestsPage />} />
                  <Route path="projects/general" element={<ProjectsGeneralPage />} />
                  <Route path="projects/create" element={<ProjectsCreatePage />} />
                  <Route path="projects/:projectId/details" element={<ProjectsDetailsPage />} />
                  <Route path="projects/podcast" element={<PodcastsPage />} />
                  <Route path="projects/courses" element={<CoursesPage />} />
                  <Route path="podcasts" element={<PodcastsPage />} />
                  <Route path="podcasts/:podcastId" element={<PodcastDetailPage />} />
                  <Route path="podcasts/:podcastId/episodes/:episodeId" element={<EpisodeDetailPage />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="courses/:courseId" element={<CourseDetailPage />} />
                  <Route path="courses/:courseId/classes/:classId" element={<ClassDetailPage />} />
                  <Route path="inventory/general" element={<InventoryGeneralPage />} />
                  <Route path="inventory/supplies" element={<SuppliesPage />} />
                  <Route path="inventory/*" element={<Navigate to="general" replace />} />
                  <Route path="users" element={<UsersManagementPage />} />
                  <Route path="users/:userId/edit" element={<div>Editar Usuario</div>} />
                  <Route path="users/create" element={<div>Crear Usuario</div>} />
                  <Route 
                    path="settings/*" 
                    element={
                      <SettingsLayout>
                        <Routes>
                          <Route path="general" element={<SettingsGeneralPage />} />
                          <Route path="user-types" element={<UserTypesPage />} />
                          <Route path="employee-roles" element={<EmployeeRolesPage />} />
                          <Route path="platforms" element={< LinkPlatformsPage />} />
                          <Route path="status-types" element={<div>Status Types Page</div>} />
                          <Route path="priorities" element={<div>Priorities Page</div>} />
                          <Route path="services" element={<div>Services Page</div>} />
                          <Route path="units" element={<div>Units Page</div>} />
                          <Route path="unit-types" element={<div>Unit Types Page</div>} />
                          <Route path="professors" element={<div>Professors Page</div>} />
                          <Route path="" element={<Navigate to="general" replace />} />
                        </Routes>
                      </SettingsLayout>
                    } 
                  />
                  <Route path="notifications" element={<div>Notificaciones Admin</div>} />
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