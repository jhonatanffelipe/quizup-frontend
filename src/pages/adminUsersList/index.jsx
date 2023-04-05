import { useCallback, useEffect, useState } from 'react'
import { FiEdit3, FiX } from 'react-icons/fi'
import moment from 'moment'

import { Container } from './styles'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { AppError } from '../../utils/errors/AppError'
import { useNavigate } from 'react-router-dom'

import { TableContainer } from '../../components/Table/TableContainer'
import { TableLoadingElement } from '../../components/Table/TableLoadingElement'
import { TableContent } from '../../components/Table/TableContent'
import { TableHead } from '../../components/Table/TableHead'
import { TableHeadRow } from '../../components/Table/TableHeadRow'
import { TableHeadTitle } from '../../components/Table/TableHeadTitle'
import { TableBody } from '../../components/Table/TableBody'
import { TableBodyRow } from '../../components/Table/TableBodyRow'
import { TableBodyRowData } from '../../components/Table/TableBodyRowData'
import { TableFooter } from '../../components/Table/TableFooter'

const AdminUsersList = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const { token, signOut } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handlePerPage = useCallback((value) => {
    console.log(value)
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
          title: 'Erro ao listar usuários',
          description: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [page, perPage, addToast, signOut, token.accessToken])

  const handleDeleteUser = useCallback(
    async (id) => {
      try {
        setLoading(true)

        if (!id) {
          throw new AppError(
            'Não foi possível deletar usuário, ID deve ser informado.'
          )
        }

        await api
          .delete(`/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Usuário deletado com sucesso',
            })
            handleRequestUsers()
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
            title: 'Erro ao deletar usuário',
            description: error.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [addToast, signOut, token.accessToken, handleRequestUsers]
  )

  const handleEditUser = useCallback(
    (id) => {
      navigate(`/users/${id}`)
    },
    [navigate]
  )

  useEffect(() => {
    void handleRequestUsers()
  }, [handleRequestUsers])

  return (
    <Container>
      <h1>Gestão de usuários</h1>
      <TableContainer>
        {loading && <TableLoadingElement />}
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableHeadTitle>Nome</TableHeadTitle>
              <TableHeadTitle>E-mail</TableHeadTitle>
              <TableHeadTitle>Ativo</TableHeadTitle>
              <TableHeadTitle>Admin</TableHeadTitle>
              <TableHeadTitle>Criado em</TableHeadTitle>
              <TableHeadTitle>Atualizado em</TableHeadTitle>
              <TableHeadTitle style={{ textAlign: 'center' }}>
                Ações
              </TableHeadTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableBodyRow key={user.id}>
                <TableBodyRowData>{user.name}</TableBodyRowData>
                <TableBodyRowData>{user.email}</TableBodyRowData>
                <TableBodyRowData>
                  {user.isActive ? 'Sim' : 'Não'}
                </TableBodyRowData>
                <TableBodyRowData>
                  {user.isAdmin ? 'Sim' : 'Não'}
                </TableBodyRowData>
                <TableBodyRowData>
                  {moment(user.createdAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyRowData>
                <TableBodyRowData>
                  {moment(user.updatedAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyRowData>
                <TableBodyRowData>
                  <div>
                    <button onClick={() => handleEditUser(user.id)}>
                      <FiEdit3 size={10} />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <FiX size={15} />
                    </button>
                  </div>
                </TableBodyRowData>
              </TableBodyRow>
            ))}
          </TableBody>
        </TableContent>
        <TableFooter
          perPage={perPage}
          page={page}
          perPageOpen={perPageOpen}
          totalPages={totalPages}
          setPerPageOpen={setPerPageOpen}
          handlePerPage={handlePerPage}
          setPage={setPage}
          handleSetPage={handleSetPage}
        />
      </TableContainer>
    </Container>
  )
}

export { AdminUsersList }
