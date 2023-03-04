import React from 'react'

import { Container } from './styles'

const Button = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" disabled={loading} {...rest}>
      {loading ? <p>Carregando...</p> : children}
    </Container>
  )
}

export default Button
