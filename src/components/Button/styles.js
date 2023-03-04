import { shade } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.button`
  width: 300px;
  padding: 16px;
  border-radius: 10px;

  background-color: #04a1c1;
  color: #ffffff;

  margin-top: 18px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#04a1c1')};
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: #5d5d5d;

      &:hover {
        background-color: #5d5d5d;
      }
    `}
`
