import styled, { css } from 'styled-components'

export const Container = styled.div`
  flex: 1;
  padding: 15px;
  background: #151922;
  height: 100vh;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`

export const Form = styled.form`
  margin-top: 26px;
`

export const Row = styled.div`
  display: flex;
  width: 100%;

  > div {
    width: 100%;

    div {
      margin-top: 8px;
    }
  }

  > div + div {
    margin-left: 16px;
  }

  ${(props) =>
    props.align === 'end' &&
    css`
      justify-content: flex-end;
    `}
`

export const CheckSession = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0 12px;

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
