import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  font-size: 12px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    color: #fff;
    padding: 6px;
    border-radius: 4px;

    &:hover {
      background: ${shade(0.2, '#293038')};
    }
  }

  > span {
    margin-left: 4px;
    margin-right: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const PerPageContent = styled.div`
  position: relative;
`

export const PerPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    margin-left: 16px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 8px;
    margin-right: 16px;
    width: 60px;
    border-radius: 4px;
    padding: 6px;

    svg {
      margin-left: 8px;
    }

    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#293038')};
    }
  }
`

export const PerPageItens = styled.div`
  z-index: 1;
  position: absolute;
  background: #293038;
  top: 28px;
  right: 15px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 60px;

  -webkit-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);

  span {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 6px 8px;
    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#293038')};
    }
  }
`
