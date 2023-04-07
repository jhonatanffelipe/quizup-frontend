import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { FiEdit3 } from 'react-icons/fi'

import { Container } from './styles'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'
import { InputSelect } from '../../components/InputSelect'
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
import { Button } from '../../components/Button'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'

const AdminSubjectsList = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [perPageOpen, setPerPageOpen] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const [requestTimeout, setRequestTimeout] = useState(null)
  const [formErros, setFormErrors] = useState({})

  // eslint-disable-next-line no-unused-vars
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [subjectsLoading, setSubjectsLoading] = useState(false)
  const [inputCategoryLoading, setInputCategoryLoading] = useState(false)

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

  const handleToSubject = useCallback(
    (id) => {
      if (!categoryId) {
        setFormErrors({
          category: 'Categoria obrigatória.',
        })
        return
      }
      navigate(`/subject${id ? '/' + id : ''}?categoryId=${categoryId}`)
    },
    [categoryId, navigate, setFormErrors]
  )

  const handleRequestCategories = useCallback(async () => {
    setCategoriesLoading(true)

    try {
      await api
        .get(`/categories?description=${category}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setCategories(response.data.data)
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
      setCategoriesLoading(false)
      setInputCategoryLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const handleRequestSubjects = useCallback(async () => {
    setSubjectsLoading(true)

    try {
      await api
        .get(`/subjects/all/${categoryId}?description=`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setSubjects(response.data.data)
          setTotalRows(response.data.totalRows)
          setTotalPages(
            Math.ceil(response.data.totalRows / response.data.perPage)
          )
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar assuntos. Por favor tente mais tarde',
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
          title: 'Erro ao listar assuntos',
          description: error.message,
        })
      }
    } finally {
      setSubjectsLoading(false)
    }
  }, [categoryId, addToast, signOut, token.accessToken])

  const handleKeyUpRequest = useCallback(
    async (e) => {
      if (e.code === 'Backspace') {
        setCategoryId('')
        setSubjects([])
      }
      setInputCategoryLoading(true)
      clearTimeout(requestTimeout)
      setRequestTimeout(setTimeout(handleRequestCategories, 1000))
    },
    [requestTimeout, handleRequestCategories]
  )

  useEffect(() => {
    void handleRequestCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (categoryId) {
      void handleRequestSubjects()
    }
  }, [categoryId, handleRequestSubjects])

  return (
    <Container>
      <h1>Assuntos</h1>
      <RowSession>
        <RowSessionColumn>
          <InputSelect
            value={category}
            items={categories}
            setValue={setCategory}
            keyUpRequest={handleKeyUpRequest}
            loading={inputCategoryLoading}
            name="category"
            placeholder="Selecione uma categoria"
            setSelected={setCategoryId}
            onChange={(e) => setCategory(e.target.value)}
            error={formErros.category}
          />
        </RowSessionColumn>
        <RowSessionColumn align="end">
          <Button size="small" onClick={() => handleToSubject()}>
            Criar Assunto
          </Button>
        </RowSessionColumn>
      </RowSession>

      <TableContainer>
        {subjectsLoading && <TableLoadingElement />}
        <TableContent>
          <TableHead>
            <TableHeadRow>
              <TableHeadTitle>Seq.</TableHeadTitle>
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
            {subjects.length > 0 ? (
              <>
                {subjects.map((subject) => (
                  <TableBodyRow key={subject.id}>
                    <TableBodyRowData>{subject.sequence}</TableBodyRowData>
                    <TableBodyRowData>{subject.description}</TableBodyRowData>
                    <TableBodyRowData>
                      {subject.isActive ? 'Sim' : 'Não'}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(subject.createdAt).format('DD/MM/yyyy HH:mm')}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      {moment(subject.updatedAt).format('DD/MM/yyyy HH:mm')}
                    </TableBodyRowData>
                    <TableBodyRowData>
                      <div>
                        <button onClick={() => handleToSubject(subject.id)}>
                          <FiEdit3 size={10} />
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

export { AdminSubjectsList }
