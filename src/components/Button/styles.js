import { shade } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.button`
  width: 300px;
  padding: 16px;
  border-radius: 10px;
  transition: background-color 0.2s;

  color: #ffffff;

  margin-top: 18px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  ${(props) =>
    props.backgroundColor
      ? css`
          background-color: ${`${props.backgroundColor}`};

          &:hover {
            background-color: ${shade(0.2, `${props.backgroundColor}`)};
          }
        `
      : css`
          background-color: #04a1c1;

          &:hover {
            background-color: ${shade(0.2, '#04a1c1')};
          }
        `}

  ${(props) =>
    props.fontColor &&
    css`
      color: fontColor;
    `}

    ${(props) =>
    props.disabled &&
    css`
      background-color: #5d5d5d;

      &:hover {
        background-color: #5d5d5d;
      }
    `}

    ${(props) =>
    props.size === 'small' &&
    css`
      width: 150px;
      margin: 18px 8px 8px 8px;
    `}
`
