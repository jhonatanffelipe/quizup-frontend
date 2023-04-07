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
import { Form } from '../../components/Form/Form'
import { FormRow } from '../../components/Form/FormRow'
import { FormButtonRow } from '../../components/Form/FormButtonRow'
import { getValidationError } from '../../utils/getValidationErros'

const AdminEmailSettings = () => {
  const location = useLocation()
  const [id] = useState(() => {
    return location.pathname
      .replace('/email-settings/', '')
      .replace('/email-settings', '')
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [password, setPassword] = useState('')

  const [createdAt, setcreatedAt] = useState('')
  const [updatedAt, setupdatedAt] = useState('')

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleRequestEmailSettings = useCallback(async () => {
    setSubmitLoading(true)

    try {
      if (id) {
        await api
          .get(`/email-settings/${id}`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setHost(response.data.host)
            setPort(response.data.port)
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
                'Erro ao listar configurações de e-mail. Por favor tente mais tarde.',
              error.response?.status || 400
            )
          })
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
          title: 'Erro ao listar configurações de e-mail.',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [id, addToast, signOut, token.accessToken])

  const handleDeleteEmailSettings = useCallback(async () => {
    try {
      setDeleteLoading(true)

      if (!id) {
        throw new AppError(
          'Não foi possível deletar configurações de e-mail, ID deve ser informado.'
        )
      }

      await api
        .delete(`/email-settings/${id}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async () => {
          addToast({
            type: 'success',
            title: 'Congigurações de e-mail deletada com sucesso.',
          })
          navigate('/email-settings')
        })
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao listar configurações de e-mail. Por favor tente mais tarde.',
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
          title: 'Erro ao deletar configurações de e-mail.',
          description: error.message,
        })
      }
    } finally {
      setDeleteLoading(false)
    }
  }, [addToast, signOut, token.accessToken, id, navigate])

  const handleSubmit = useCallback(async () => {
    setFormErros({})

    try {
      setSubmitLoading(true)

      const data = {
        name,
        port,
        host,
        email,
        password,
      }

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        port: Yup.string().required('Porta obrigatória'),
        host: Yup.string().required('Host obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })

      data.email = data.email.trim()

      await schema.validate(data, {
        abortEarly: false,
      })

      if (id) {
        await api
          .put(`/email-settings/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Congigurações de e-mail alterado com sucesso',
            })

            navigate('/email-settings')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao atualizar configurações de e-mail. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      } else {
        await api
          .post(`/email-settings`, data, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            addToast({
              type: 'success',
              title: 'Congigurações de e-mail criado com sucesso',
            })

            navigate('/email-settings')
          })
          .catch((error) => {
            throw new AppError(
              error.response?.data?.error.message ||
                error.response?.data?.error ||
                'Erro ao criar configurações de e-mail. Por favor tente mais tarde',
              error.response?.status || 400
            )
          })
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErros(errors)
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
          title: 'Erro ao criar/atualizar configurações de e-mail',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [
    name,
    email,
    host,
    port,
    password,
    addToast,
    signOut,
    token.accessToken,
    id,
    navigate,
  ])

  useEffect(() => {
    void handleRequestEmailSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Configurações de E-mail</h1>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Senha"
              type="password"
              error={formErrors.password}
              autoComplete="off"
            />
          </div>

          <div>
            <span>Host</span>
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              name="host"
              placeholder="Host"
              error={formErrors.host}
              autoComplete="off"
            />
          </div>
        </FormRow>

        <FormRow>
          <div>
            <span>Porta</span>
            <Input
              value={port}
              onChange={(e) => setPort(e.target.value)}
              name="port"
              placeholder="Porta"
              type="port"
              error={formErrors.port}
              autoComplete="off"
            />
          </div>

          <div></div>
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
            onClick={() => navigate('/')}
            size="small"
            buttonStyle="secondary"
          >
            Cancelar
          </ButtonComponent>

          {id && (
            <ButtonComponent
              onClick={handleDeleteEmailSettings}
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

export { AdminEmailSettings }
