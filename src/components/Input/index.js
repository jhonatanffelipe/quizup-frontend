import React, { useState, useCallback, useRef } from 'react'

import { Container } from './styles'

const Input = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    console.log('Aqui')
    setIsFocused(false)

    setIsField(!!inputRef.current?.value)
  }, [])

  return (
    <Container isFocused={isFocused} isField={isField}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}

export default Input
