import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  background: #151922;
`

export const ImageInput = styled.div`
  position: relative;
  margin-top: 50px;

  label {
    cursor: pointer;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: #04a1c1;

    &:hover {
      background-color: ${shade(0.2, '#04a1c1')};
    }

    position: absolute;
    bottom: 0px;
    left: 100px;

    display: flex;

    justify-content: center;
    align-items: center;
  }

  input {
    display: none;
  }

  div {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: solid 3px #04a1c1;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`
