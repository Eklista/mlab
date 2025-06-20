import { useState } from 'react'
import { useAuth } from './useAuth'
import type { LoginCredentials } from '../types/auth'

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export const useLogin = (): UseLoginReturn => {
  const { login: authLogin, isLoading: authLoading, error: authError, clearError: authClearError } = useAuth()
  const [localLoading, setLocalLoading] = useState(false)

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLocalLoading(true)
      await authLogin(credentials)
    } finally {
      setLocalLoading(false)
    }
  }

  return {
    login,
    isLoading: authLoading || localLoading,
    error: authError,
    clearError: authClearError
  }
}