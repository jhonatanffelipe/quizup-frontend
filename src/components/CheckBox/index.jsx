import React from 'react'
import { FiCheck } from 'react-icons/fi'

import { Container } from './styles'

const CheckBox = ({ checked, setChecked, title, ...rest }) => {
  return (
    <Container checked={checked} {...rest}>
      <div
        onClick={() => {
          setChecked(!checked)
        }}
      >
        {checked && <FiCheck />}
      </div>
      <span>{title}</span>
    </Container>
  )
}

export { CheckBox }
