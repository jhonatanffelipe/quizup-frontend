import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { shade } from 'polished'

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
`

export const MenuTitle = styled.div`
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

    > svg {
      color: #fff;

      &:hover {
        color: ${shade(0.2, '#04a1c1')};
      }
    }
  }
`

export const MenuSession = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > svg {
    margin-top: 22px;

    cursor: pointer;

    &:hover {
      color: ${shade(0.2, '#04a1c1')};
    }
  }
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  width: 250px;
  border-radius: 8px;
  margin-top: 8px;

  span {
    flex: 1;
  }

  cursor: pointer;

  &:hover {
    background: #2a2d33;
  }
`

export const MenuSessionSubItens = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const MenuSubItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  width: 250px;
  border-radius: 8px;

  color: #fff;
  text-decoration: none;

  &:hover {
    background: #2a2d33;
  }
  cursor: pointer;
`
