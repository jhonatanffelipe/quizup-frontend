import React, { createContext, useCallback, useContext, useState } from 'react'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { auth } from '../services/authenticate/auth'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@QuizEdu:token')
    const user = localStorage.getItem('@QuizEdu:user')

    if (token && user) {
      return { token: JSON.parse(token), user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await auth({
        email,
        password,
      })

      const { user, accessToken, iat, exp } = response.data

      localStorage.setItem('@QuizEdu:user', JSON.stringify(user))
      localStorage.setItem(
        '@QuizEdu:token',
        JSON.stringify({ accessToken, iat, exp })
      )

      setData({ user, token: { accessToken, iat, exp } })
    },
    [setData]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('@QuizEdu:token')
    localStorage.removeItem('@QuizEdu:user')

    setData({})
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, token: data.token, setData }}
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
