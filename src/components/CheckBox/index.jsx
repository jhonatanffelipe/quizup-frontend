import React from 'react'
import { FiCheck } from 'react-icons/fi'

import { Container } from './styles'

const CheckBox = ({ checked, setChecked }) => {
  return (
    <Container checked={checked}>
      <div
        onClick={() => {
          setChecked(!checked)
        }}
      >
        {checked && <FiCheck />}
      </div>
      <span>Ativo</span>
    </Container>
  )
}

export { CheckBox }
