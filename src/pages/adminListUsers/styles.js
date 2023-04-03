import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  padding: 15px;
  background: #2a2d33;
  height: 100vh;
  padding-top: 24px;
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #151922;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
`

export const TableContent = styled.table`
  border-collapse: collapse;
`

export const TableHead = styled.thead``

export const TableLoaginElement = styled.div`
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

export const TableHeadRow = styled.tr`
  height: 48px;
`

export const TableTitle = styled.th`
  text-align: start;
  padding: 0 8px;
`

export const TableBody = styled.tbody``

export const TableBodyRow = styled.tr`
  height: 36px;
  &:hover {
    background: #2a2d33;
  }
  border-radius: 8px;
`

export const CheckedElement = styled.input`
  cursor: pointer;
`

export const TableBodyData = styled.td`
  padding: 0 8px;
  border-collapse: collapse;

  div {
    display: flex;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
      color: #fff;
      width: 15px;

      &:hover {
        color: #04a1c1;
      }
    }
  }
`

export const CheckedElementArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const TableFooter = styled.div`
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
      background: #2a2d33;
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
      background: #2a2d33;
    }
  }
`

export const PerPageItens = styled.div`
  z-index: 1;
  position: absolute;
  background: #151922;
  top: 28px;
  left: 108px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 60px;

  span {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 6px 8px;
    cursor: pointer;

    &:hover {
      background: #2a2d33;
    }
  }
`
