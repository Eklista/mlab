# Medialab Platform - Frontend Web

Sistema de gestión interno para el Departamento Medialab de Universidad Galileo.

## 🚀 Stack Tecnológico

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand + Context API
- **Authentication**: JWT (JWE) tokens
- **Real-time**: WebSocket (Socket.io)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin

## 📁 Arquitectura del Proyecto

```
src/
├── layouts/                 # Layouts principales
│   ├── AdminLayout/        # Layout para administradores
│   ├── AuthLayout/         # Layout para autenticación
│   └── ClientLayout/       # Layout para clientes
├── modules/                # Módulos por funcionalidad
│   ├── auth/               # Autenticación y autorización
│   ├── projects/           # Gestión de proyectos
│   ├── inventory/          # Control de inventario
│   ├── users/              # Gestión de usuarios
│   ├── service-requests/   # Solicitudes de servicios
│   ├── settings/           # Configuraciones del sistema
│   └── realtime/           # Comunicación en tiempo real
├── views/                  # Páginas/vistas principales
│   ├── admin/              # Vistas para administradores
│   ├── client/             # Vistas para clientes
│   ├── auth/               # Páginas de autenticación
│   └── public/             # Páginas públicas
├── core/                   # Funcionalidades compartidas
│   ├── components/         # Componentes globales
│   ├── hooks/              # Hooks reutilizables
│   ├── services/           # Servicios compartidos
│   ├── types/              # Tipos TypeScript globales
│   └── utils/              # Utilidades comunes
└── config/                 # Configuraciones de la aplicación
```

## 🎯 Funcionalidades Principales

### Para Administradores
- **Dashboard completo** con métricas y estadísticas
- **Gestión de proyectos** audiovisuales
- **Control de inventario** de equipos
- **Administración de usuarios** y permisos
- **Gestión de solicitudes** de servicios
- **Configuraciones del sistema** (SMTP, CRUDs, etc.)
- **Comunicación en tiempo real** con flags de edición

### Para Clientes
- **Dashboard simplificado** con resumen personal
- **Vista de proyectos** asignados
- **Gestión de solicitudes** propias
- **Formulario de nuevas solicitudes**

## 🔐 Sistema de Autenticación

- **Tokens JWE** para autenticación segura
- **Refresh tokens** automáticos
- **Persistencia** en localStorage
- **Roles de usuario**: Admin y Cliente
- **Rutas protegidas** por rol
- **Auto-logout** en caso de tokens inválidos

## ⚡ Funcionalidades Técnicas

- **PWA Ready** - Instalable como aplicación
- **Real-time updates** - WebSocket para colaboración
- **Rate limiting** - Protección contra abuso
- **Offline support** - Cache inteligente con Workbox
- **TypeScript estricto** - Sin `any`, validación completa
- **Responsive design** - Optimizado para todos los dispositivos
- **Hot reload** - Desarrollo rápido con Vite

## 🛠️ Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/Eklista/mlab.git
cd mlab

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

## 🌍 Variables de Entorno

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_APP_TITLE=Medialab Platform
```

## 👥 Usuarios de Prueba

```
Admin:
  Email: admin@galileo.edu
  Password: cualquier contraseña

Cliente:
  Email: cliente@galileo.edu
  Password: cualquier contraseña
```

## 📱 Características PWA

- **Instalable** en dispositivos móviles y desktop
- **Offline cache** para funcionalidad básica
- **Background sync** para sincronización automática
- **Push notifications** (próximamente)

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece al Departamento Medialab de Universidad Galileo.

## 🏗️ Estado del Proyecto

- ✅ Sistema de autenticación completo
- ✅ Layouts responsivos (Admin/Cliente/Auth)
- ✅ Dashboards básicos
- ✅ Arquitectura modular establecida
- 🚧 Módulos específicos (en desarrollo)
- 🚧 Integración con backend (próximamente)
- 📋 Comunicación en tiempo real (planificado)

---

**Departamento Medialab** - Universidad Galileo  
Sistema de gestión interno v1.0.0