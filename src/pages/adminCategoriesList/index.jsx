import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEdit3, FiX } from 'react-icons/fi'
import moment from 'moment'

import { Container } from './styles'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { AppError } from '../../utils/errors/AppError'

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

const AdminCategoriesList = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const { token, signOut } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

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

  const handleRequestCategories = useCallback(async () => {
    setLoading(true)
    try {
      await api
        .get(`/categories?page=${page}&perPage=${perPage}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setCategories(response.data.data)
          setTotalRows(response.data.totalRows)
          setTotalPages(
            Math.ceil(response.data.totalRows / response.data.perPage)
          )
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar categorias. Por favor tente mais tarde',
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
          title: 'Erro ao listar categorias',
          description: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [page, perPage, addToast, signOut, token.accessToken])

  const handleDeleteCategory = useCallback(
    async (id) => {
      try {
        setLoading(true)

        if (!id) {
          throw new AppError(
            'Não foi possível deletar categoria, ID deve ser informado.'
          )
        }

        await api
          .delete(`/categories/${id}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'categoria deletada com sucesso',
            })
            handleRequestCategories()
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao listar categorias. Por favor tente mais tarde',
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
            title: 'Erro ao deletar categoria',
            description: error.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [addToast, signOut, token.accessToken, handleRequestCategories]
  )

  const handleEditcategory = useCallback(
    (id) => {
      navigate(`/categories/${id}`)
    },
    [navigate]
  )

  useEffect(() => {
    void handleRequestCategories()
  }, [handleRequestCategories])

  return (
    <Container>
      <h1>Categorias</h1>

      <TableContainer>
        {loading && <TableLoadingElement />}
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableHeadTitle>Descrição</TableHeadTitle>
              <TableHeadTitle>Ativo</TableHeadTitle>
              <TableHeadTitle>Criado em</TableHeadTitle>
              <TableHeadTitle>Atualizado em</TableHeadTitle>
              <TableHeadTitle style={{ textAlign: 'center' }}>
                Ações
              </TableHeadTitle>
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableBodyRow key={category.id}>
                <TableBodyRowData>{category.description}</TableBodyRowData>
                <TableBodyRowData>
                  {category.isActive ? 'Sim' : 'Não'}
                </TableBodyRowData>
                <TableBodyRowData>
                  {moment(category.createdAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyRowData>
                <TableBodyRowData>
                  {moment(category.updatedAt).format('DD/MM/yyyy HH:mm')}
                </TableBodyRowData>
                <TableBodyRowData>
                  <div>
                    <button onClick={() => handleEditcategory(category.id)}>
                      <FiEdit3 size={10} />
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)}>
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
          totalRows={totalRows}
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
export { AdminCategoriesList }
