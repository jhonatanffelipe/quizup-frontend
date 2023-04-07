import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`
