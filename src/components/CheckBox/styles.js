import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 22px;

  div {
    height: 24px;
    width: 24px;
    border: 2px solid #04a1c1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin: 0 12px 0 0 !important;
    cursor: pointer;

    ${(props) =>
      props.checked &&
      css`
        background: #04a1c1;
      `}
  }
`
