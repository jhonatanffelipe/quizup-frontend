import React from 'react'

import { AuthProvider } from './auth'
import { PasswordProvider } from './password'
import { ToastProvider } from './toast'

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PasswordProvider>
        <ToastProvider>{children}</ToastProvider>
      </PasswordProvider>
    </AuthProvider>
  )
}

export default AppProvider
