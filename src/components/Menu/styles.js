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
  font-size: 14px;

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
    width: 120px;
    margin-left: 9px;
    opacity: 1;
    padding-top: 8px;

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
`

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 55px;
    height: 55px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: transparent;

    color: #fff;
  }
`

export const MenuItemTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  margin-top: 2px;

  span {
    flex: 1;
    margin-left: 6px;
  }

  cursor: pointer;

  &:hover {
    background: #2a2d33;
  }

  > svg {
    margin-right: 16px;
  }
`

export const MenuSessionSubItens = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuSubItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 8px 12px 60px;
  width: 100%;
  border-radius: 8px;

  color: #fff;
  text-decoration: none;

  &:hover {
    background: #2a2d33;
  }
  cursor: pointer;
`
