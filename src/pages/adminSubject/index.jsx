import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Container } from './styles'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'
import { Form } from '../../components/Form/Form'
import { FormRow } from '../../components/Form/FormRow'
import { Input } from '../../components/Input'
import { FormButtonRow } from '../../components/Form/FormButtonRow'
import { ButtonComponent } from '../adminCategory/styles'
import { InputSelect } from '../../components/InputSelect'
import { CheckBox } from '../../components/CheckBox'

const AdminSubject = () => {
  const location = useLocation()
  const [categoryId] = useState(() => {
    return location.search.split('?categoryId=')[1]
  })
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const [category, setCategory] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [previousSubject, setPreviousSubject] = useState('')
  const [previousSubjectId, setPreviousSubjectId] = useState('')

  const [categoryLoading, setCategoryLoading] = useState(false)
  const [subjectsLoading, setSubjectsLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [inputBeforeSubjectLoading, setInputBeforeSubjectLoading] =
    useState(false)
  const [requestTimeout, setRequestTimeout] = useState(null)

  const [formErrors, setFormErrors] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleRequestCategory = useCallback(async () => {
    setCategoryLoading(true)

    try {
      if (categoryId) {
        await api
          .get(`/categories/${categoryId}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then((response) => {
            setCategory(response.data)
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao listar categoria. Por favor tente mais tarde.',
              error.response?.status || 400
            )
          })
      } else {
        navigate('/subjects')
        throw new AppError('Categoria não informada.')
      }
    } catch (error) {
      if (error.statusCode === 401) {
        addToast({
          type: 'error',
          title: 'Erro de autenticação.',
          description: error.message,
        })
        signOut()
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao listar categorias.',
          description: error.message,
        })
      }
    } finally {
      setCategoryLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRequestSubjects = useCallback(async () => {
    setSubjectsLoading(true)

    try {
      await api
        .get(`/subjects/all/${categoryId}?description=${previousSubject}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((response) => {
          setSubjects(response.data.data)
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
      setInputBeforeSubjectLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousSubject])

  const handleDeleteSubject = useCallback(async () => {
    setDeleteLoading(true)
    try {
    } catch (error) {
    } finally {
      setDeleteLoading(false)
    }
  }, [])

  const handleKeyUpRequest = useCallback(
    async (e) => {
      if (e.code === 'Backspace') {
        setPreviousSubjectId('')
      }
      setInputBeforeSubjectLoading(true)
      clearTimeout(requestTimeout)
      setRequestTimeout(setTimeout(handleRequestSubjects, 1000))
    },
    [requestTimeout, handleRequestSubjects]
  )

  const handleSubmit = useCallback(async () => {
    setSubmitLoading(true)
    try {
    } catch (error) {
    } finally {
      setSubmitLoading(false)
    }
  }, [])

  useEffect(() => {
    void handleRequestCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    void handleRequestSubjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container>
      <h1>Assunto</h1>

      {categoryLoading ? (
        <p>Carregando...</p>
      ) : (
        <Form>
          <FormRow>
            <div>
              <span>Categoria</span>
              <Input
                value={category.description}
                name="category"
                placeholder="Categoria"
                disabled
              />
            </div>

            <div>
              <span>Assunto anterior</span>
              <InputSelect
                value={previousSubject}
                items={subjects}
                setValue={setPreviousSubject}
                keyUpRequest={handleKeyUpRequest}
                loading={inputBeforeSubjectLoading}
                name="previousSubject"
                placeholder="Selecione o assunto anterior"
                setSelected={setPreviousSubjectId}
                onChange={(e) => setPreviousSubject(e.target.value)}
                error={formErrors.previousSubject}
              />
            </div>
          </FormRow>

          <FormRow>
            <div>
              <span>Descrição</span>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Descrição"
                error={formErrors?.description}
              />
            </div>

            <CheckBox
              setChecked={setIsActive}
              checked={isActive}
              style={{ marginTop: '22px' }}
              title="Ativo"
            />
          </FormRow>

          <FormRow>
            <div>
              <label>Criado em</label>
              <Input value={createdAt} name="createdAt" disabled />
            </div>
            <div>
              <span>Atualizado em</span>
              <Input value={updatedAt} name="updatedAt" disabled />
            </div>
          </FormRow>

          <FormButtonRow align="end">
            <ButtonComponent
              onClick={() => navigate('/subjects')}
              size="small"
              buttonStyle="secondary"
              style={{ margin: '8px' }}
            >
              Cancelar
            </ButtonComponent>

            {categoryId && (
              <ButtonComponent
                onClick={handleDeleteSubject}
                size="small"
                loading={deleteLoading}
                buttonStyle="error"
                style={{ margin: '8px' }}
              >
                Excluir
              </ButtonComponent>
            )}
            <ButtonComponent
              size="small"
              onClick={handleSubmit}
              loading={submitLoading}
              buttonStyle="success"
              style={{ margin: '8px' }}
            >
              Confirmar
            </ButtonComponent>
          </FormButtonRow>
        </Form>
      )}
    </Container>
  )
}

export { AdminSubject }
