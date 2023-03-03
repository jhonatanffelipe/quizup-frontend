import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    background: #00a875;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    width: 160px;
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #00a875 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    cursor: pointer;
  }
`
