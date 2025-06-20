// src/modules/auth/context/authContext.ts (NUEVO ARCHIVO - solo el contexto)
import { createContext } from 'react'
import type { AuthContextType } from '../types/auth'

export const AuthContext = createContext<AuthContextType | null>(null)