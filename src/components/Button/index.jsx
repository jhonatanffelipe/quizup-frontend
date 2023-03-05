import React from 'react'

import { Container } from './styles'

const Button = ({
  children,
  loading,
  backgroundColor,
  borderColor,
  ...rest
}) => {
  return (
    <Container
      type="button"
      disabled={loading}
      backgroundColor={backgroundColor}
      {...rest}
    >
      {loading ? <p>Carregando...</p> : children}
    </Container>
  )
}

export default Button
