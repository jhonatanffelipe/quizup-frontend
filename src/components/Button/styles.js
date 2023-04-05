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
      color: ${`${props.fontColor}`};
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
      height: 46px;
    `}


    ${(props) =>
    props.buttonStyle === 'success' &&
    css`
      background-color: #198754;

      &:hover {
        background-color: ${shade(0.2, `#198754`)};
      }
    `}

    ${(props) =>
    props.buttonStyle === 'error' &&
    css`
      background-color: #dc3545;

      &:hover {
        background-color: ${shade(0.2, `#DC3545`)};
      }
    `}

    ${(props) =>
    props.buttonStyle === 'warning' &&
    css`
      background-color: #ffc107;
      color: #000;

      &:hover {
        background-color: ${shade(0.2, `#FFC107`)};
      }
    `}

    ${(props) =>
    props.buttonStyle === 'secondary' &&
    css`
      background-color: #6c757d;

      &:hover {
        background-color: ${shade(0.2, `#6C757D`)};
      }
    `}
`
