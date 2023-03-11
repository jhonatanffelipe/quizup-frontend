import { useCallback, useState } from 'react'
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronUp,
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
  CheckedElement,
  TableFooter,
  TableContainer,
  PerPageContent,
  PerPage,
  PerPageItens,
} from './styles'

const UserSettings = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [perPageOpen, setPerPageOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [users] = useState([
    {
      selected: false,
      id: 'a9b429a1-35db-48e1-bde3-ce4dc09ae72f',
      name: 'Jhonatan Felipe',
      email: 'jhonatanfnm@gmail.com',
      avatar:
        'http://localhost:3333/avatar/4f1be67eb95bfca03bc4d856ad43b625-perfil-black.jpg',
      isActive: true,
      isAdmin: true,
      createdAt: '2023-03-04T13:30:58.449Z',
      updatedAt: '2023-03-04T13:30:58.449Z',
    },
    {
      selected: false,
      id: '562f5428-7608-4f8e-a4f4-701bfcc39332',
      name: 'Usuário Teste',
      email: 'jhonatan.jf83@gmail.com',
      avatar: null,
      isActive: true,
      isAdmin: false,
      createdAt: '2023-03-05T12:59:33.673Z',
      updatedAt: '2023-03-05T12:59:33.673Z',
    },
  ])

  const handleRowsPerPage = useCallback((value) => {
    setRowsPerPage(value)
    setPerPageOpen(false)
  }, [])

  const handleElementsSelecteds = useCallback(
    (value) => {
      if (selected.some((element) => element === value)) {
        setSelected(selected.filter((element) => element !== value))
      } else {
        setSelected((selected) => [...selected, value])
      }
    },
    [selected]
  )

  return (
    <Container>
      <h1>Gestão de usuários</h1>
      <TableContainer>
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableTitle></TableTitle>
              <TableTitle>Nome</TableTitle>
              <TableTitle>E-mail</TableTitle>
              <TableTitle>Ativo</TableTitle>
              <TableTitle>Admin</TableTitle>
              <TableTitle>Criar em</TableTitle>
              <TableTitle>Atualizado em</TableTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableBodyRow
                key={user.id}
                onClick={() => handleElementsSelecteds(user.id)}
              >
                <TableBodyData>
                  <CheckedElement
                    type="checkbox"
                    selected={user.selected}
                    onChange={(e) => {
                      handleElementsSelecteds(user.id)
                    }}
                  />
                </TableBodyData>
                <TableBodyData>{user.name}</TableBodyData>
                <TableBodyData>{user.email}</TableBodyData>
                <TableBodyData>{user.isActive ? 'Sim' : 'Não'}</TableBodyData>
                <TableBodyData>{user.isAdmin ? 'Sim' : 'Não'}</TableBodyData>
                <TableBodyData>{user.createdAt}</TableBodyData>
                <TableBodyData>{user.updatedAt}</TableBodyData>
              </TableBodyRow>
            ))}
          </TableBody>
        </TableContent>
        <TableFooter>
          <PerPageContent>
            <PerPage>
              <span>Linhas por página:</span>
              <div onClick={() => setPerPageOpen(!perPageOpen)}>
                {rowsPerPage}
                {perPageOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </PerPage>
            {perPageOpen && (
              <PerPageItens>
                <span onClick={() => handleRowsPerPage(5)}>5</span>
                <span onClick={() => handleRowsPerPage(10)}>10</span>
                <span onClick={() => handleRowsPerPage(15)}>15</span>
              </PerPageItens>
            )}
          </PerPageContent>

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
