import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  background: #151922;

  > div {
    display: flex;
    width: 100%;
    margin-top: 24px;

    > div {
      width: 100%;
    }

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }
`
