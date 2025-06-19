import type { LoginCredentials, AuthResponse, User } from '../types/auth'

// Simulated users for testing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@galileo.edu',
    firstName: 'Juan',
    lastName: 'Pérez',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'cliente@galileo.edu',
    firstName: 'María',
    lastName: 'García',
    role: 'client',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

const generateTokens = () => ({
  accessToken: `mock_access_token_${Date.now()}`,
  refreshToken: `mock_refresh_token_${Date.now()}`,
  expiresIn: 3600
})

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Simulate password validation (accept any password for demo)
    if (credentials.password.length < 1) {
      throw new Error('La contraseña es requerida')
    }

    // Generate tokens
    const tokens = generateTokens()

    return {
      user,
      tokens
    }
  },

  async refreshToken(_refreshToken: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // For demo, just return a new token set with the first user
    const user = mockUsers[0]
    if (!user) {
      throw new Error('No user found')
    }

    const tokens = generateTokens()

    return {
      user,
      tokens
    }
  },

  async logout(): Promise<void> {
    // Simulate API call to invalidate tokens
    await new Promise(resolve => setTimeout(resolve, 300))
  },

  async getCurrentUser(_token: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // For demo, return the first user
    const user = mockUsers[0]
    if (!user) {
      throw new Error('No user found')
    }

    return user
  }
}