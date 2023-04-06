import styled, { css } from 'styled-components'

export const Container = styled.form`
  display: flex;
  width: 100%;

  > div {
    width: 100%;
    padding: 8px;
  }

  ${(props) =>
    props.align === 'end' &&
    css`
      justify-content: flex-end;
    `}

  @media (max-width: 900px) {
    flex-direction: column;
  }
`
