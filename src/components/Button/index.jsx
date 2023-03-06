import React from 'react'

import { Container } from './styles'

const Button = ({ children, loading, backgroundColor, fontColor, ...rest }) => {
  return (
    <Container
      type="button"
      disabled={loading}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      {...rest}
    >
      {loading ? <p>Carregando...</p> : children}
    </Container>
  )
}

export { Button }
