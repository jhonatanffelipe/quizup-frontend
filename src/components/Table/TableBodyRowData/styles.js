import styled from 'styled-components'

export const Container = styled.td`
  padding: 0 8px;
  border-collapse: collapse;

  div {
    display: flex;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
      color: #fff;
      width: 15px;

      &:hover {
        color: #04a1c1;
      }
    }
  }
`
