import { shade } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  z-index: 1;
`

export const ContentMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 3px #04a1c1;
    margin-right: 15px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      color: #04a1c1;
      margin-left: 8px;
      margin-right: 16px;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }
`

export const Content = styled.div`
  width: 300px;
  height: 310px;
  background-color: #293038;
  top: 80px;
  right: 35px;

  display: block;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  padding: 16px 8px;

  ${(props) =>
    props.showContent
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}

  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);

  div {
    padding: 4px;

    span {
      font-size: 14px;
    }

    p {
      font-size: 12px;
      color: #c1c1c1;
    }

    button {
      border: none;
    }
  }

  .info-profile {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-profile > div:first-child {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid 3px #04a1c1;
    padding: 0;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .menu-profile-itens {
    padding: 15px 10px 0;

    > a {
      & + a {
        margin-top: 8px;
      }

      &:hover {
        background-color: ${shade(0.2, '#293038')};
      }

      width: 100%;
      background: #293038;
      border: none;
      color: #fff;
      padding: 8px 16px;
      text-decoration: none;

      border-radius: 8px;

      display: flex;
      align-items: center;

      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 16px;
      }
    }

    .sign-out {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #04a1c1;
      padding: 8px 16px;
      border-radius: 8px;
      margin-top: 8px;

      &:hover {
        background-color: ${shade(0.2, '#04a1c1')};
      }
    }
  }
`
