import { Container } from './styles'

const TableWithoutData = ({ children }) => {
  return (
    <Container>
      <td>{children}</td>
    </Container>
  )
}

export { TableWithoutData }
