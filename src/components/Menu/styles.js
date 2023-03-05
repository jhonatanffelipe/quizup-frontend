import styled, { css, keyframes } from 'styled-components'

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

export const Container = styled.menu`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #151922;
  padding-top: 10px;

  ${(props) =>
    css`
      width: ${props.width}px;
    `}

  transition: width 0.1s;

  .menu-title {
    display: flex;
    align-items: center;

    img {
      width: 150px;
      margin-left: 25px;
      opacity: 1;

      animation: ${appearFromLeft} 0.7s;
    }

    justify-content: start;

    padding-left: 2px;
    padding-right: 3px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border: none;
      background-color: transparent;
      border-radius: 50%;
    }
  }
`
