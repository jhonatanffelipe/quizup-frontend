import React, { useState, useCallback, useRef } from 'react'
import { FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi'

import {
  Container,
  Content,
  Error,
  Options,
  OptionsItem,
  OptionsLoading,
} from './styles'

const InputSelect = ({
  items,
  value,
  error,
  disabled,
  loading,
  setSelected,
  keyUpRequest,
  ...rest
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  window.onclick = (e) => {
    if (
      !(
        (e.target?.className?.includes &&
          e.target?.className?.includes('select-input')) ||
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
      setSelected({ id: item.id, description: item.description })
      setIsFocused(false)
    },
    [setSelected]
  )

  return (
    <Container>
      <Content
        isFocused={isFocused}
        error={error}
        disabled={disabled}
        className="select-input"
        onClick={() => handleInputFocus()}
      >
        <input
          ref={inputRef}
          value={value}
          disabled={disabled}
          className="select-input"
          onKeyUp={keyUpRequest}
          {...rest}
        />

        {isFocused ? <FiChevronUp /> : <FiChevronDown />}

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Content>

      {isFocused && (
        <Options id="content-select-input">
          {loading && <OptionsLoading />}
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
