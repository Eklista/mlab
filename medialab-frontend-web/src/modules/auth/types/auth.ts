export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'client'
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  clearError: () => void
}