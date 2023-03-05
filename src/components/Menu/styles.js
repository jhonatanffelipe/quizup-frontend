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
  background: #2a2d33;
  padding-top: 10px;

  ${(props) =>
    css`
      width: ${props.width}px;
    `}

  transition: width 0.5s;

  .menu-title {
    display: flex;
    align-items: center;

    img {
      width: 150px;
      margin-left: 15px;
      opacity: 1;

      animation: ${appearFromLeft} 0.5s;
    }

    ${(props) =>
      props.menuOpen
        ? css`
            padding-left: 10px;
            justify-content: start;
          `
        : css`
            justify-content: center;
          `}

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
