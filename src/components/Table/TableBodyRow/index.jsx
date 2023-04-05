import { Container } from './styles'

const TableBodyRow = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export { TableBodyRow }
