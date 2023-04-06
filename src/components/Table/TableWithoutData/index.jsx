import { Container } from './styles'

const TableWithoutData = ({ children }) => {
  return (
    <Container>
      <td>Nenhum item encontrado</td>
    </Container>
  )
}

export { TableWithoutData }
