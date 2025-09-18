import React, { createContext, useState, useEffect } from 'react'
import * as authAPI from '../api/auth'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch (e) { return null }
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const register = async ({ email, password }) => {
    const res = await authAPI.registerUser({ email, password })
    // expecting { token, user }
    const { data } = res
    if (data?.token) {
      localStorage.setItem('token', data.token)
      setUser(data.user || { email })
    }
    return data
  }

  const login = async ({ email, password }) => {
  try {
    const res = await authAPI.loginUser({ email, password });
    const { data } = res;
    if (data?.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user || { email });
    }
    return data;
  } catch (err) {
    console.error('Login failed', err);
    throw err;
  }
}


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}