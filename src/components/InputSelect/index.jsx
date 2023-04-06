import React, { useState, useCallback, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Content, Error, Options, OptionsItem } from './styles'

const InputSelect = ({
  items,
  value,
  error,
  disabled,
  setValue,
  setSelected,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  window.onclick = (e) => {
    if (
      !(
        e.target?.className?.includes('select-input') ||
        e.target?.className?.baseVal === 'select-input'
      )
    ) {
      if (e.target !== document.getElementById('content-select-input')) {
        setIsFocused(false)
      }
    }
  }

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleChangeItem = useCallback(
    (item) => {
      setValue(item.description)
      setSelected(item.id)
      setIsFocused(false)
    },
    [setSelected, setValue]
  )

  return (
    <Container>
      <Content
        isFocused={isFocused}
        error={error}
        disabled={disabled}
        className="select-input"
      >
        <input
          onFocus={() => handleInputFocus()}
          ref={inputRef}
          value={value}
          disabled={disabled}
          className="select-input"
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Content>
      {isFocused && (
        <Options id="content-select-input">
          {items.map((item) => (
            <OptionsItem
              key={item.id}
              value={item.id}
              onClick={() => handleChangeItem(item)}
            >
              {item.description}
            </OptionsItem>
          ))}
        </Options>
      )}
    </Container>
  )
}

export { InputSelect }
