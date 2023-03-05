import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  min-width: 50vw;

  animation: ${appearFromLeft} 1s;

  img {
    width: 300px;
    margin-bottom: 44px;
  }

  @media (max-width: 900px) {
    flex: 1;
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #04a1c1;
    margin-top: 32px;
    text-decoration: none;

    svg {
      margin-right: 8px;
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 24px;
  }

  > a {
    color: #fff;
    margin-top: 32px;
    text-decoration: none;
  }
`

export const Backgound = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #04a1c1;

  min-height: 750px;

  img {
    width: 70%;
  }

  @media (max-width: 900px) {
    display: none;
  }
`
