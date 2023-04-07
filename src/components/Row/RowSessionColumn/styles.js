import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;

  ${(props) =>
    props.align === 'end' &&
    css`
      display: flex;
      justify-content: flex-end;
    `}

  @media (max-width: 900px) {
    display: flex;
    justify-content: flex-start;
    margin-top: 24px;
  }
`
