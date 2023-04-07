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
import { TableWithoutData } from '../../components/Table/TableWithoutData'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'
import { Button } from '../../components/Button'

const AdminTagsList = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)

  const [tags, setTags] = useState([])
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

  const handleRequestTags = useCallback(async () => {
    setLoading(true)
    try {
      await api
        .get(`/tags?page=${page}&perPage=${perPage}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setTags(response.data.data)
          setTotalRows(response.data.totalRows)
          setTotalPages(
            Math.ceil(response.data.totalRows / response.data.perPage)
          )
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar tags. Por favor tente mais tarde',
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
          title: 'Erro ao listar tags',
          description: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [page, perPage, addToast, signOut, token.accessToken])

  const handleDeleteTag = useCallback(
    async (id) => {
      try {
        setLoading(true)

        if (!id) {
          throw new AppError(
            'Não foi possível deletar tag, ID deve ser informado.'
          )
        }

        await api
          .delete(`/tags/${id}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Tag deletada com sucesso',
            })
            handleRequestTags()
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao listar tags. Por favor tente mais tarde',
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
            title: 'Erro ao deletar tag',
            description: error.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [addToast, signOut, token.accessToken, handleRequestTags]
  )

  const handleToTag = useCallback(
    (id) => {
      navigate(`/tag${id ? '/' + id : ''}`)
    },
    [navigate]
  )

  useEffect(() => {
    void handleRequestTags()
  }, [handleRequestTags])

  return (
    <Container>
      <h1>Tags</h1>

      <RowSession>
        <RowSessionColumn></RowSessionColumn>
        <RowSessionColumn align="end">
          <Button size="small" onClick={() => handleToTag()}>
            Criar Tag
          </Button>
        </RowSessionColumn>
      </RowSession>

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
            {tags.length > 0 ? (
              <>
                {tags.map((tag) => (
                  <TableBodyRow key={tag.id}>
                    <TableBodyRowData>{tag.description}</TableBodyRowData>
                    <TableBodyRowData>
                      {tag.isActive ? 'Sim' : 'Não'}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(tag.createdAt).format('DD/MM/yyyy HH:mm')}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(tag.updatedAt).format('DD/MM/yyyy HH:mm')}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      <div>
                        <button onClick={() => handleToTag(tag.id)}>
                          <FiEdit3 size={10} />
                        </button>
                        <button onClick={() => handleDeleteTag(tag.id)}>
                          <FiX size={15} />
                        </button>
                      </div>
                    </TableBodyRowData>
                  </TableBodyRow>
                ))}
              </>
            ) : (
              <TableWithoutData />
            )}
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
export { AdminTagsList }
