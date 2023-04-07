import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  background: #151922;
`

export const Session = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const SessionColumn = styled.div`
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
