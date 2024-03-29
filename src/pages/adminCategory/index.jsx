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

const AdminCategory = () => {
  const location = useLocation()
  const [categoryId] = useState(() => {
    return location.pathname.replace('/category/', '').replace('/category', '')
  })
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

  const handleRequestCategory = useCallback(async () => {
    setSubmitLoading(true)

    try {
      if (categoryId) {
        await api
          .get(`/categories/${categoryId}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then((response) => {
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
                'Erro ao listar dodos da categoria. Por favor tente mais tarde',
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
          title: 'Erro ao listar categoria',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [categoryId, addToast, signOut, token.accessToken])

  const handleDeleteCategory = useCallback(async () => {
    try {
      setDeleteLoading(true)

      if (!categoryId) {
        throw new AppError(
          'Não foi possível deletar categoria, ID deve ser informado.'
        )
      }

      await api
        .delete(`/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Categoria deletada com sucesso',
          })
          navigate('/categories')
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar dodos da categoria. Por favor tente mais tarde',
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
      setDeleteLoading(false)
    }
  }, [addToast, signOut, token.accessToken, categoryId, navigate])

  const handleSubmit = useCallback(async () => {
    setFormErrors({})

    try {
      setSubmitLoading(true)

      const data = {
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

      if (categoryId) {
        await api
          .put(`/categories/${categoryId}`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Categoria alterada com sucesso',
            })

            navigate('/categories')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao atualizar categoria. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      } else {
        await api
          .post(`/categories`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Categoria criada com sucesso',
            })

            navigate('/categories')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao criar categoria. Por favor tente mais tarde',
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
          title: 'Erro ao criar/atualizar categoria',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [
    description,
    isActive,
    addToast,
    signOut,
    token.accessToken,
    categoryId,
    navigate,
  ])

  useEffect(() => {
    void handleRequestCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Categorias</h1>

      <Form>
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
            onClick={() => navigate('/categories')}
            size="small"
            buttonStyle="secondary"
            style={{ margin: '8px' }}
          >
            Cancelar
          </ButtonComponent>

          {categoryId && (
            <ButtonComponent
              onClick={handleDeleteCategory}
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
    </Container>
  )
}

export { AdminCategory }
