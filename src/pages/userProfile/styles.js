import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  background: #2a2d33;

  align-items: center;

  > div {
    position: relative;
    margin-top: 50px;

    img {
      width: 200px;
      border-radius: 50%;
      border: solid 3px #04a1c1;
    }

    .update-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background-color: #04a1c1;

      &:hover {
        background-color: ${shade(0.2, '#04a1c1')};
      }

      position: absolute;
      bottom: 15px;
      right: 0px;
    }
  }
`

export const Form = styled.div``
