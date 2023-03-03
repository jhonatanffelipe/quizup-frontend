import React from 'react'
import { useTransition } from 'react-spring'
import { Container } from './styles'
import { Toast } from './Toast'

const ToastContainer = ({ messages }) => {
  const messagesWithTrasictions = useTransition(messages, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  })
  return (
    <Container>
      {messagesWithTrasictions((style, item) => (
        <Toast key={item.id} message={item} style={style} />
      ))}
    </Container>
  )
}

export { ToastContainer }
