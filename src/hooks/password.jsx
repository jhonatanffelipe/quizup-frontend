import React, { createContext, useCallback, useContext } from 'react'
import api from '../services/api'

const PasswordContext = createContext({})

const PasswordProvider = ({ children }) => {
  const forgotPasword = useCallback(async ({ email }) => {
    await api.post('/password/forgot', {
      email,
    })
  }, [])

  return (
    <PasswordContext.Provider value={{ forgotPasword }}>
      {children}
    </PasswordContext.Provider>
  )
}

function usePassword() {
  const context = useContext(PasswordContext)

  if (!context) {
    throw new Error('usePassword deve ser usado dentro de um PasswordProvider')
  }

  return context
}

export { PasswordProvider, usePassword }
