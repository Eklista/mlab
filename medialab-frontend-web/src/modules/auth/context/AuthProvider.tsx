// src/modules/auth/context/AuthProvider.tsx
import { useReducer, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthState, AuthContextType, LoginCredentials, User, AuthTokens } from '../types/auth'
import { authService } from '../services/authService'

// Storage keys
const STORAGE_KEYS = {
  TOKENS: 'medialab_auth_tokens',
  USER: 'medialab_auth_user',
  LAST_ROUTE: 'medialab_last_route'
} as const

// Auth reducer
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    
    case 'LOGOUT':
      return {
        ...initialState
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    default:
      return state
  }
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): React.JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Guardar la ruta actual cada vez que cambie la ubicación
  useEffect(() => {
    const saveCurrentRoute = () => {
      const currentPath = window.location.pathname
      // Solo guardar rutas autenticadas, no las públicas
      if (currentPath.includes('/admin/') || currentPath.includes('/client/')) {
        localStorage.setItem(STORAGE_KEYS.LAST_ROUTE, currentPath)
      }
    }

    // Guardar inmediatamente si estamos en una ruta autenticada
    saveCurrentRoute()

    // Escuchar cambios de navegación
    const handlePopState = () => {
      saveCurrentRoute()
    }

    // También escuchar cambios en el pathname usando MutationObserver
    const observer = new MutationObserver(() => {
      saveCurrentRoute()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    })

    window.addEventListener('popstate', handlePopState)

    // Interceptar clicks en enlaces para guardar la ruta
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        setTimeout(saveCurrentRoute, 50) // Pequeño delay para que se actualice la URL
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      observer.disconnect()
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  // Load stored auth data on mount
  useEffect(() => {
    const loadStoredAuth = (): void => {
      try {
        const storedTokens = localStorage.getItem(STORAGE_KEYS.TOKENS)
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER)

        if (storedTokens && storedUser) {
          const tokens = JSON.parse(storedTokens) as AuthTokens
          const user = JSON.parse(storedUser) as User

          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, tokens }
          })

          // Restaurar la última ruta después de cargar el auth
          setTimeout(() => {
            const lastRoute = localStorage.getItem(STORAGE_KEYS.LAST_ROUTE)
            if (lastRoute && window.location.pathname !== lastRoute) {
              // Solo restaurar si no estamos ya en una ruta específica
              const currentPath = window.location.pathname
              if (currentPath === '/' || currentPath === '/login' || currentPath === '/dashboard') {
                window.history.replaceState(null, '', lastRoute)
              }
            }
          }, 100)
        }
      } catch (error) {
        console.error('Error loading stored auth:', error)
        localStorage.removeItem(STORAGE_KEYS.TOKENS)
        localStorage.removeItem(STORAGE_KEYS.USER)
        localStorage.removeItem(STORAGE_KEYS.LAST_ROUTE)
      }
    }

    loadStoredAuth()
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' })

      const response = await authService.login(credentials)

      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(response.tokens))
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })

      // Después del login exitoso, redirigir a la última ruta o dashboard por defecto
      setTimeout(() => {
        const lastRoute = localStorage.getItem(STORAGE_KEYS.LAST_ROUTE)
        const defaultRoute = response.user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'
        
        if (lastRoute && lastRoute.includes(`/${response.user.role}/`)) {
          window.history.replaceState(null, '', lastRoute)
        } else {
          window.history.replaceState(null, '', defaultRoute)
        }
      }, 100)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de autenticación'
      dispatch({
        type: 'LOGIN_ERROR',
        payload: message
      })
      throw error
    }
  }, [])

  // Logout function
  const logout = useCallback((): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKENS)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.LAST_ROUTE)

    void authService.logout().catch(console.error)

    dispatch({ type: 'LOGOUT' })

    // Redirigir al login después del logout
    window.history.replaceState(null, '', '/login')
  }, [])

  // Refresh auth function
  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      if (!state.tokens?.refreshToken) {
        throw new Error('No refresh token available')
      }

      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await authService.refreshToken(state.tokens.refreshToken)

      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(response.tokens))
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })
    } catch (error) {
      logout()
      throw error
    }
  }, [state.tokens?.refreshToken, logout])

  // Clear error function
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}