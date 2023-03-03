import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ToastContainer } from '../components/ToastContainer'

const ToastContext = createContext({})

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addToast = useCallback(({ type, title, descripition }) => {
    const id = uuidv4()
    const toast = { id, type, title, descripition }

    setMessages((state) => [...state, toast])
  }, [])

  const removeToast = useCallback((id) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
