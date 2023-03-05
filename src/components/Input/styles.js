import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

export const Container = styled.div`
  background: #293038;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #293038;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    !!props.error
      ? css`
          border: 2px solid #c53030;
        `
      : css`
          border: 2px solid #293038;
        `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #04a1c1;
      border-color: #04a1c1;
    `}

  ${(props) =>
    props.isField &&
    css`
      color: #04a1c1;
    `}

  ${(props) =>
    !!props.error
      ? css`
          border: 2px solid #c53030;
        `
      : css`
          border: 2px solid #293038;
        `}

  input {
    color: #fff;
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
