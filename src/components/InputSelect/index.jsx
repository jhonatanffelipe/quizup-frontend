import React, { useState, useCallback, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

const InputSelect = ({
  name,
  icon: Icon,
  value,
  error,
  register,
  disabled,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback((e) => {
    setIsFocused(false)
    setIsField(!!e.target.value)
  }, [])

  return (
    <Container
      isFocused={isFocused}
      isField={isField}
      error={error}
      disabled={disabled}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => handleInputFocus()}
        onBlurCapture={(e) => handleInputBlur(e)}
        ref={inputRef}
        value={value}
        disabled={disabled}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  )
}

export { InputSelect }
