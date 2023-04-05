import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.tr`
  height: 36px;
  &:hover {
    background: ${shade(0.2, '#293038')};
  }
  border-radius: 8px;
`
