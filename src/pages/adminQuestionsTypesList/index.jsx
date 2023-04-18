import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ButtonComponent, Container } from './styles'
import { api } from '../../services/api'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'
import { TableContainer } from '../../components/Table/TableContainer'
import { TableLoadingElement } from '../../components/Table/TableLoadingElement'
import { TableContent } from '../../components/Table/TableContent'
import { TableHead } from '../../components/Table/TableHead'
import { TableHeadRow } from '../../components/Table/TableHeadRow'
import { TableHeadTitle } from '../../components/Table/TableHeadTitle'
import { TableBody } from '../../components/Table/TableBody'
import { TableBodyRow } from '../../components/Table/TableBodyRow'
import { TableBodyRowData } from '../../components/Table/TableBodyRowData'
import moment from 'moment'
import { TableWithoutData } from '../../components/Table/TableWithoutData'
import { TableFooter } from '../../components/Table/TableFooter'
import { FiEdit3, FiX } from 'react-icons/fi'

const AdminQuestionsTypesList = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)

  const [questionsTypes, setQuestionsTypes] = useState([])
  const [loading, setLoading] = useState(false)

  const { signOut, token } = useAuth()
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

  const handleRequestQuestionsTypes = useCallback(async () => {
    setLoading(true)
    try {
      await api
        .get(`/questions-types?page=${page}&perPage=${perPage}&title=`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setQuestionsTypes(response.data.data)
          setTotalRows(response.data.totalRows)
          setTotalPages(
            Math.ceil(response.data.totalRows / response.data.perPage)
          )
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar tipos de questões. Por favor tente mais tarde',
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

  const handleDeleteQuestionType = useCallback(
    async (id) => {
      try {
        setLoading(true)

        if (!id) {
          throw new AppError(
            'Não foi possível deletar tipo de questão, ID deve ser informado.'
          )
        }

        await api
          .delete(`/questions-types/${id}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Tipo de questão deletada com sucesso',
            })
            handleRequestQuestionsTypes()
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao listar tipos de questões. Por favor tente mais tarde',
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
            title: 'Erro ao deletar tipo de questão',
            description: error.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [addToast, signOut, token.accessToken, handleRequestQuestionsTypes]
  )

  const handleToQuestionType = useCallback(
    (id) => {
      navigate(`/question/type${id ? '/' + id : ''}`)
    },
    [navigate]
  )

  useEffect(() => {
    void handleRequestQuestionsTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Tipos de Questões</h1>

      <RowSession>
        <RowSessionColumn></RowSessionColumn>
        <RowSessionColumn align="end">
          <ButtonComponent onClick={() => handleToQuestionType()}>
            Criar Tipo de Questão
          </ButtonComponent>
        </RowSessionColumn>
      </RowSession>

      <TableContainer>
        {loading && <TableLoadingElement />}
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableHeadTitle>Código</TableHeadTitle>
              <TableHeadTitle>Título</TableHeadTitle>
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
            {questionsTypes.length > 0 ? (
              <>
                {questionsTypes.map((questionType) => (
                  <TableBodyRow key={questionType.id}>
                    <TableBodyRowData>{questionType.code}</TableBodyRowData>
                    <TableBodyRowData>{questionType.title}</TableBodyRowData>
                    <TableBodyRowData>
                      {questionType.description}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {questionType.isActive ? 'Sim' : 'Não'}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(questionType.createdAt).format(
                        'DD/MM/yyyy HH:mm'
                      )}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(questionType.updatedAt).format(
                        'DD/MM/yyyy HH:mm'
                      )}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      <div>
                        <button
                          onClick={() => handleToQuestionType(questionType.id)}
                        >
                          <FiEdit3 size={10} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteQuestionType(questionType.id)
                          }
                        >
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
export { AdminQuestionsTypesList }
