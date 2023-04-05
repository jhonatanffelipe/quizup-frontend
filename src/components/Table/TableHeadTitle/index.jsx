import { Container } from './styles'

const TableHeadTitle = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export { TableHeadTitle }
