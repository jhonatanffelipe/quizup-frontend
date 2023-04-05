import styled from 'styled-components'

export const Container = styled.div`
  height: 3px;
  width: 100%;
  background: #04a1c1;
  border-radius: 2px;

  @keyframes animate {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.2;
    }
  }

  animation: animate 1.5s linear infinite;
`
