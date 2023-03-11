import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi'

import {
  Container,
  TableContent,
  TableHead,
  TableHeadRow,
  TableTitle,
  TableBody,
  TableBodyRow,
  TableBodyData,
  TableFooter,
  TableContainer,
} from './styles'

const UserSettings = () => {
  return (
    <Container>
      <h1>Gestão de usuários</h1>

      <TableContainer>
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableTitle>ID</TableTitle>
              <TableTitle>Nome</TableTitle>
              <TableTitle>E-mail</TableTitle>
              <TableTitle>Ativo</TableTitle>
              <TableTitle>Administrador</TableTitle>
              <TableTitle>Criar em</TableTitle>
              <TableTitle>Atualizado em</TableTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            <TableBodyRow>
              <TableBodyData>1</TableBodyData>
              <TableBodyData>Jhonatan</TableBodyData>
              <TableBodyData>jhonatanfnm@gmail.com</TableBodyData>
              <TableBodyData>true</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyData>1</TableBodyData>
              <TableBodyData>Jhonatan</TableBodyData>
              <TableBodyData>jhonatanfnm@gmail.com</TableBodyData>
              <TableBodyData>true</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
            </TableBodyRow>
          </TableBody>
        </TableContent>
      </TableContainer>
      <TableFooter>
        <div>2 de 25</div>
        <button>
          <FiChevronsLeft />
        </button>
        <button>
          <FiChevronLeft />
        </button>
        <div>1 de 3</div>
        <button>
          <FiChevronRight />
        </button>
        <button>
          <FiChevronsRight />
        </button>
      </TableFooter>
    </Container>
  )
}

export { UserSettings }
