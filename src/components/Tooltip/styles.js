import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    background: #c53030;
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
    left: 2px;
    transform: translateX(-91%);

    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      right: 2%;
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
