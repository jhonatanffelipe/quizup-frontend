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

const AdminUsers = () => {
  const location = useLocation()
  const [userId] = useState(() => {
    return location.pathname.replace('/user/', '').replace('/user', '')
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [createdAt, setcreatedAt] = useState('')
  const [updatedAt, setupdatedAt] = useState('')

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleRequestUser = useCallback(async () => {
    setSubmitLoading(true)

    try {
      if (userId) {
        await api
          .get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setIsActive(response.data.isActive)
            setIsAdmin(response.data.isAdmin)
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
                'Erro ao listar dodos do usuário. Por favor tente mais tarde',
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
          title: 'Erro ao listar dodos do usuário',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [userId, addToast, signOut, token.accessToken])

  const handleDeleteUser = useCallback(async () => {
    try {
      setDeleteLoading(true)

      if (!userId) {
        throw new AppError(
          'Não foi possível deletar usuário, ID deve ser informado.'
        )
      }

      await api
        .delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Usuário deletado com sucesso',
          })
          navigate('/users')
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
      setDeleteLoading(false)
    }
  }, [addToast, signOut, token.accessToken, userId, navigate])

  const handleSubmit = useCallback(async () => {
    setFormErrors({})

    try {
      setSubmitLoading(true)

      const data = {
        name,
        email,
        password,
        confirmPassword,
        isActive,
        isAdmin,
      }

      let schema = {}

      schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
      })

      data.email = data.email.trim()

      if (data.password || data.confirmPassword) {
        schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          confirmPassword: Yup.string()
            .required('Confirmação de senha obrigatória')
            .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
        })
      }

      await schema.validate(data, {
        abortEarly: false,
      })

      if (userId) {
        await api
          .put(`/users/${userId}`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Usuário alterado com sucesso',
            })

            navigate('/users')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao atualizar dodos dos usuários. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      } else {
        await api
          .post(`/users`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Usuário criado com sucesso',
            })

            navigate('/users')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao criar dodos dos usuários. Por favor tente mais tarde',
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
          title: 'Erro ao criar/atualizar usuário',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    isActive,
    isAdmin,
    addToast,
    signOut,
    token.accessToken,
    userId,
    navigate,
  ])

  useEffect(() => {
    void handleRequestUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Usuários</h1>

      <Form>
        <FormRow>
          <div>
            <span>Nome</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Nome"
              error={formErrors?.name}
            />
          </div>
          <div>
            <span>E-mail</span>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="E-mail"
              error={formErrors?.email}
            />
          </div>
        </FormRow>

        <FormRow>
          <div>
            <span>Senha</span>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Senha"
              type="password"
              error={formErrors.password}
              autoComplete="off"
            />
          </div>

          <div>
            <span>Confirmar senha</span>
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              placeholder="Confirmar senha"
              type="password"
              error={formErrors.confirmPassword}
              autoComplete="off"
            />
          </div>
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

        <FormRow>
          <CheckBox setChecked={setIsActive} checked={isActive} title="Ativo" />
          <CheckBox
            setChecked={setIsAdmin}
            checked={isAdmin}
            title="Administrador"
          />
        </FormRow>

        <FormButtonRow align="end">
          <ButtonComponent
            onClick={() => navigate('/users')}
            size="small"
            buttonStyle="secondary"
          >
            Cancelar
          </ButtonComponent>

          {userId && (
            <ButtonComponent
              onClick={handleDeleteUser}
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

export { AdminUsers }
