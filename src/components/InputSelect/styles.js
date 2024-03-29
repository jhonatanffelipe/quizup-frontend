import styled, { css } from 'styled-components'

import { Tooltip } from '../Tooltip'
import { shade } from 'polished'

export const Container = styled.div`
  position: relative;
`

export const Content = styled.div`
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

  input {
    color: #fff;
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #fff;
    transition: background-color 5000s ease-in-out 0s;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.3;
    `}
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

export const Options = styled.ul`
  background: #293038;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin-top: 2px;
  z-index: 1;
  position: absolute;

  -webkit-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 0px 13px 6px rgba(0, 0, 0, 0.23);
`

export const OptionsItem = styled.li`
  display: block;
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: ${shade(0.2, '#293038')};
  }
`

export const OptionsLoading = styled.div`
  height: 3px;
  width: 100%;
  background: #04a1c1;
  border-radius: 2px;

  @keyframes animate {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.2;
    }
  }

  animation: animate 1.5s linear infinite;
`
