import styled, { css } from 'styled-components'

export const Container = styled.div``

export const ContentMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  img {
    width: 40px;
    border-radius: 50%;
    border: solid 2px #04a1c1;
  }

  div {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: #04a1c1;
      margin-left: 8px;
      margin-right: 16px;
    }
  }
`

export const Content = styled.div`
  width: 300px;
  height: 300px;
  background-color: #2a2d33;
  top: 80px;
  right: 35px;

  position: absolute;

  ${(props) =>
    props.showContent
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  transition: opacity 0.3s;
`
