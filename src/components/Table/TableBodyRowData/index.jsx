import { Container } from './styles'

const TableBodyRowData = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export { TableBodyRowData }
