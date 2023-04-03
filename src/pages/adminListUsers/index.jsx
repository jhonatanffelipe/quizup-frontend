import { useCallback, useEffect, useState } from 'react'
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronUp,
  FiEdit3,
  FiX,
} from 'react-icons/fi'
import moment from 'moment'

import {
  Container,
  TableContent,
  TableHead,
  TableLoaginElement,
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
  CheckedElementArea,
} from './styles'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { AppError } from '../../utils/errors/AppError'

const AdminListUsers = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const handlePerPage = useCallback((value) => {
    setPage(1)
    setPerPage(value)
    setPerPageOpen(false)
  }, [])

  const handleSetPage = useCallback(
    (goPage) => {
      if (goPage === 1) {
        setPage(page + 1 <= totalPages ? page + 1 : totalPages)
      } else {
        setPage(page - 1 <= 1 ? 1 : page - 1)
      }
    },
    [page, totalPages]
  )

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

  const handleRequestUsers = useCallback(async () => {
    setLoading(true)
    try {
      await api
        .get(`/users?page=${page}&perPage=${perPage}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setUsers(response.data.data)

          setTotalPages(
            Math.ceil(response.data.totalRows / response.data.perPage)
          )
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar dodos dos usuários. Por favor tente mais tarde',
            error.response?.status || 400
          )
        })
    } catch (error) {
      if (error.statusCode === 401) {
        addToast({
          type: 'error',
          title: 'Erro de autenticação',
          description: error.message,
        })
        signOut()
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar avatar',
          description: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [page, perPage, addToast, signOut, token.accessToken])

  useEffect(() => {
    void handleRequestUsers()
  }, [handleRequestUsers])

  return (
    <Container>
      <h1>Gestão de usuários</h1>
      <TableContainer>
        {loading && <TableLoaginElement />}
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
              <TableTitle style={{ textAlign: 'center' }}>Ações</TableTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableBodyRow key={user.id}>
                <TableBodyData>
                  <CheckedElementArea>
                    <CheckedElement
                      type="checkbox"
                      selected={user.selected}
                      onChange={(e) => {
                        handleElementsSelecteds(user.id)
                      }}
                    />
                  </CheckedElementArea>
                </TableBodyData>
                <TableBodyData>{user.name}</TableBodyData>
                <TableBodyData>{user.email}</TableBodyData>
                <TableBodyData>{user.isActive ? 'Sim' : 'Não'}</TableBodyData>
                <TableBodyData>{user.isAdmin ? 'Sim' : 'Não'}</TableBodyData>
                <TableBodyData>
                  {moment(user.createdAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyData>
                <TableBodyData>
                  {moment(user.updatedAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyData>
                <TableBodyData>
                  <div>
                    <button>
                      <FiEdit3 size={10} />
                    </button>
                    <button>
                      <FiX size={15} />
                    </button>
                  </div>
                </TableBodyData>
              </TableBodyRow>
            ))}
          </TableBody>
        </TableContent>
        <TableFooter>
          <PerPageContent>
            <PerPage>
              <span>Linhas por página:</span>
              <div onClick={() => setPerPageOpen(!perPageOpen)}>
                {perPage}
                {perPageOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </PerPage>
            {perPageOpen && (
              <PerPageItens>
                <span onClick={() => handlePerPage(5)}>5</span>
                <span onClick={() => handlePerPage(10)}>10</span>
                <span onClick={() => handlePerPage(15)}>15</span>
              </PerPageItens>
            )}
          </PerPageContent>

          <button onClick={() => setPage(1)}>
            <FiChevronsLeft />
          </button>
          <button onClick={() => handleSetPage(-1)}>
            <FiChevronLeft />
          </button>

          <span>
            {page} de {totalPages}
          </span>

          <button onClick={() => handleSetPage(1)}>
            <FiChevronRight />
          </button>
          <button onClick={() => setPage(totalPages)}>
            <FiChevronsRight />
          </button>
        </TableFooter>
      </TableContainer>
    </Container>
  )
}

export { AdminListUsers }
