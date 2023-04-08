import React, { createContext, useCallback, useContext, useState } from 'react'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { api } from '../services/api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@QuizUp:token')
    const user = localStorage.getItem('@QuizUp:user')

    if (token && user) {
      return { token: JSON.parse(token), user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('auth', {
        email,
        password,
      })

      const { user, accessToken, iat, exp } = response.data

      localStorage.setItem('@QuizUp:user', JSON.stringify(user))
      localStorage.setItem(
        '@QuizUp:token',
        JSON.stringify({ accessToken, iat, exp })
      )

      setData({ user, token: { accessToken, iat, exp } })
    },
    [setData]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@QuizUp:token')
    localStorage.removeItem('@QuizUp:user')
    sessionStorage.removeItem('@QuizUp:subjects')

    setData({})
  }, [])

  const updateContextData = useCallback(
    async ({ user, token }) => {
      localStorage.setItem('@QuizUp:user', JSON.stringify(user))
      localStorage.setItem('@QuizUp:token', JSON.stringify(token))
      setData({ user, token })
    },
    [setData]
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        token: data.token,
        updateContextData,
      }}
    >
      {data.user?.isAdmin && <Header />}
      {data.user?.isAdmin && <Menu />}
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
