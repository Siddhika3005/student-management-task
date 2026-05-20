import { createContext, useContext, useMemo, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  const persistSession = (payload) => {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user))
    setToken(payload.token)
    setUser(payload.user)
  }

  const register = async (formData) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/register', formData)
      persistSession(response.data)
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error.response?.data?.message || 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  const login = async (formData) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/login', formData)
      persistSession(response.data)
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error.response?.data?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, token, loading, register, login, logout }),
    [user, token, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
