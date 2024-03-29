import { shade } from 'polished'
import styled from 'styled-components'
import { Button } from '../../components/Button'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  background: #151922;

  align-items: center;
`

export const AvatarInput = styled.div`
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
    right: 0px;

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

export const Form = styled.form`
  margin-top: 25px;

  > div {
    margin-top: 25px;
  }
`

export const ButtonComponent = styled(Button)`
  margin-top: 24px;
`
