import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { AuthState, AuthContextType, LoginCredentials, User, AuthTokens } from '../types/auth'
import { authService } from '../services/authService'

// Storage keys
const STORAGE_KEYS = {
  TOKENS: 'medialab_auth_tokens',
  USER: 'medialab_auth_user'
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

// Context
const AuthContext = createContext<AuthContextType | null>(null)

// Provider
interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): React.JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialState)

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
        }
      } catch (error) {
        console.error('Error loading stored auth:', error)
        // Clear invalid data
        localStorage.removeItem(STORAGE_KEYS.TOKENS)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }

    loadStoredAuth()
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' })

      const response = await authService.login(credentials)

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(response.tokens))
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })
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
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKENS)
    localStorage.removeItem(STORAGE_KEYS.USER)

    // Call API to invalidate tokens (fire and forget)
    authService.logout().catch(console.error)

    dispatch({ type: 'LOGOUT' })
  }, [])

  // Refresh auth function
  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      if (!state.tokens?.refreshToken) {
        throw new Error('No refresh token available')
      }

      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await authService.refreshToken(state.tokens.refreshToken)

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(response.tokens))
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response
      })
    } catch (error) {
      // If refresh fails, logout user
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

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}