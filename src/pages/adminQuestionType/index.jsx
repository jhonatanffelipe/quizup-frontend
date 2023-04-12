import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as Yup from 'yup'

import { ButtonComponent, Container } from './styles'
import { Input } from '../../components/Input'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'
import { CheckBox } from '../../components/CheckBox'
import { Form } from '../../components/Form/Form'
import { FormRow } from '../../components/Form/FormRow'
import { FormButtonRow } from '../../components/Form/FormButtonRow'
import { getValidationError } from '../../utils/getValidationErros'

const AdminQuestionType = () => {
  const location = useLocation()
  const [questionTypeId] = useState(() => {
    return location.pathname
      .replace('/question/type/', '')
      .replace('/question/type', '')
  })
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [createdAt, setcreatedAt] = useState('')
  const [updatedAt, setupdatedAt] = useState('')

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleRequestQuestionType = useCallback(async () => {
    setSubmitLoading(true)

    try {
      if (questionTypeId) {
        await api
          .get(`/questions/types/${questionTypeId}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then((response) => {
            setCode(response.data.code)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setIsActive(response.data.isActive)
            setcreatedAt(
              moment(response.data.createdAt).format('DD/MM/yyyy HH:mm')
            )
            setupdatedAt(
              moment(response.data.updatedAt).format('DD/MM/yyyy HH:mm')
            )
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao listar dodos do tipo de questão. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      }
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
          title: 'Erro ao listar tipo de questão',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [questionTypeId, addToast, signOut, token.accessToken])

  const handleDeleteQuestionType = useCallback(async () => {
    try {
      setDeleteLoading(true)

      if (!questionTypeId) {
        throw new AppError(
          'Não foi possível deletar tipo de questão, ID deve ser informado.'
        )
      }

      await api
        .delete(`/questions/types/${questionTypeId}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Tipo de questão deletada com sucesso',
          })
          navigate('/questions/types')
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar dodos do tipo de questão. Por favor tente mais tarde',
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
      setDeleteLoading(false)
    }
  }, [addToast, signOut, token.accessToken, questionTypeId, navigate])

  const handleSubmit = useCallback(async () => {
    setFormErrors({})

    try {
      setSubmitLoading(true)

      const data = {
        code,
        title,
        description,
        isActive,
      }

      let schema = {}

      schema = Yup.object().shape({
        description: Yup.string().required('Decrição obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      if (questionTypeId) {
        await api
          .put(`/questions/types/${questionTypeId}`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Categoria alterado com sucesso',
            })

            navigate('/questions/types')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao criar/atualizar tipo de questão. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      } else {
        await api
          .post(`/questions/types/`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Categoria criada com sucesso',
            })

            navigate('/questions/types')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao criar/atualizao tipo de questão. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErrors(errors)
        return
      }

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
          title: 'Erro ao criar/atualizar tipo de questão',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [
    code,
    title,
    description,
    isActive,
    addToast,
    signOut,
    token.accessToken,
    questionTypeId,
    navigate,
  ])

  useEffect(() => {
    void handleRequestQuestionType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Tipos de Questões</h1>

      <Form>
        <FormRow>
          <div>
            <span>Código</span>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              name="code"
              placeholder="Código"
              error={formErrors?.code}
            />
          </div>

          <div>
            <span>Título</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Título"
              error={formErrors?.title}
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
            onClick={() => navigate('/questions/types')}
            size="small"
            buttonStyle="secondary"
          >
            Cancelar
          </ButtonComponent>
          {questionTypeId && (
            <ButtonComponent
              onClick={handleDeleteQuestionType}
              size="small"
              loading={deleteLoading}
              buttonStyle="error"
            >
              Excluir
            </ButtonComponent>
          )}
          <ButtonComponent
            size="small"
            onClick={handleSubmit}
            loading={submitLoading}
            buttonStyle="success"
          >
            Confirmar
          </ButtonComponent>
        </FormButtonRow>
      </Form>
    </Container>
  )
}

export { AdminQuestionType }
