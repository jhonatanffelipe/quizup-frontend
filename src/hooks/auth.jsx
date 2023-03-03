import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@TurtleQuiz:token')
    const user = localStorage.getItem('@TurtleQuiz:user')

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

      const { user, accessToken, refreshToken, iat, exp } = response.data

      localStorage.setItem('@TurtleQuiz:user', JSON.stringify(user))
      localStorage.setItem(
        '@TurtleQuiz:token',
        JSON.stringify({ accessToken, refreshToken, iat, exp })
      )

      setData({ user, token: { accessToken, refreshToken, iat, exp } })
    },
    [setData]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@TurtleQuiz:token')
    localStorage.removeItem('@TurtleQuiz:user')

    setData({})
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
