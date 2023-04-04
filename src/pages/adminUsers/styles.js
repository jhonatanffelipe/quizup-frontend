import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  background: #151922;
`

export const Form = styled.form`
  margin-top: 26px;
  height: auto;
`

export const Row = styled.div`
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

export const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 48px;

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

export const CheckSession = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0 12px;

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
