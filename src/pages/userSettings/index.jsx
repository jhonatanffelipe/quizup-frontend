import { useState } from 'react'
import {
  FiChevronDown,
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
  PerPage,
} from './styles'

const UserSettings = () => {
  const [rowsPerPage, serRowsPerGage] = useState(5)

  return (
    <Container>
      <h1>Gestão de usuários</h1>

      <TableContainer>
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableTitle>Nome</TableTitle>
              <TableTitle>E-mail</TableTitle>
              <TableTitle>Ativo</TableTitle>
              <TableTitle>Admin</TableTitle>
              <TableTitle>Criar em</TableTitle>
              <TableTitle>Atualizado em</TableTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            <TableBodyRow>
              <TableBodyData>Jhonatan</TableBodyData>
              <TableBodyData>jhonatanfnm@gmail.com</TableBodyData>
              <TableBodyData>
                <input
                  type="checkbox"
                  disabled
                  checked={false}
                  name="active"
                  id="active"
                />
              </TableBodyData>
              <TableBodyData>
                <input
                  type="checkbox"
                  disabled
                  checked={true}
                  name="admin"
                  id="admin"
                />
              </TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyData>Jhonatan</TableBodyData>
              <TableBodyData>jhonatanfnm@gmail.com</TableBodyData>
              <TableBodyData>
                <input
                  type="checkbox"
                  disabled
                  checked={true}
                  name="active"
                  id="active"
                />
              </TableBodyData>
              <TableBodyData>
                <input
                  type="checkbox"
                  disabled
                  checked={true}
                  name="admin"
                  id="admin"
                />
              </TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
              <TableBodyData>10/03/2023 08:00:00</TableBodyData>
            </TableBodyRow>
          </TableBody>
        </TableContent>
        <TableFooter>
          <PerPage>
            <span>Linhas por página:</span>
            <div>
              {rowsPerPage}
              <FiChevronDown />
            </div>
          </PerPage>

          <button>
            <FiChevronsLeft />
          </button>
          <button>
            <FiChevronLeft />
          </button>

          <span>1 de 3</span>

          <button>
            <FiChevronRight />
          </button>
          <button>
            <FiChevronsRight />
          </button>
        </TableFooter>
      </TableContainer>
    </Container>
  )
}

export { UserSettings }
