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

const AdminTag = () => {
  const location = useLocation()
  const [tagId] = useState(() => {
    return location.pathname.replace('/tag/', '').replace('/tag', '')
  })
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [createdAt, setcreatedAt] = useState('')
  const [updatedAt, setupdatedAt] = useState('')

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleRequestTag = useCallback(async () => {
    setSubmitLoading(true)

    try {
      if (tagId) {
        await api
          .get(`/tags/${tagId}`, {
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
                'Erro ao listar dodos da tag. Por favor tente mais tarde',
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
          title: 'Erro ao listar tag',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [tagId, addToast, signOut, token.accessToken])

  const handleDeleteTag = useCallback(async () => {
    try {
      setDeleteLoading(true)

      if (!tagId) {
        throw new AppError(
          'Não foi possível deletar tag, ID deve ser informado.'
        )
      }

      await api
        .delete(`/tags/${tagId}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Tag deletada com sucesso',
          })
          navigate('/tags')
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar dodos da tag. Por favor tente mais tarde',
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
  }, [addToast, signOut, token.accessToken, tagId, navigate])

  const handleSubmit = useCallback(async () => {
    setFormErros({})

    try {
      setSubmitLoading(true)

      if (!tagId) {
        throw new AppError(
          'Não foi possível deletar tag, ID deve ser informado.'
        )
      }

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

      await api
        .put(`/tags/${tagId}`, data, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Categoria alterado com sucesso',
          })

          navigate('/tags')
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao atualizar tag. Por favor tente mais tarde',
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
          title: 'Erro ao atualizar tag',
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
    tagId,
    navigate,
  ])

  useEffect(() => {
    void handleRequestTag()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Tags</h1>

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
            onClick={() => navigate('/tags')}
            size="small"
            buttonStyle="secondary"
          >
            Cancelar
          </ButtonComponent>
          {tagId && (
            <ButtonComponent
              onClick={handleDeleteTag}
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

export { AdminTag }
