import React from 'react'

import { Container } from './styles'

const Button = ({
  children,
  loading,
  backgroundColor,
  fontColor,
  size,
  buttonStyle,
  ...rest
}) => {
  return (
    <Container
      type="button"
      disabled={loading}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      size={size}
      buttonStyle={buttonStyle}
      {...rest}
    >
      {loading ? <p>Carregando...</p> : children}
    </Container>
  )
}

export { Button }
