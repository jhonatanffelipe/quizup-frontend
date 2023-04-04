import { useCallback, useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import * as Yup from 'yup'

import { Container, Form, Row, ButtonRow, CheckSession } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'

const AdminUsers = () => {
  const location = useLocation()
  const [userId] = useState(() => {
    return location.pathname.replace('/users/', '')
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [createdAt, setcreatedAt] = useState('')
  const [updatedAt, setupdatedAt] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleRequestUser = useCallback(async () => {
    setSubmitLoading(true)

    try {
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
          title: 'Erro ao atualizar avatar',
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
    setFormErros({})

    try {
      setSubmitLoading(true)

      if (!userId) {
        throw new AppError(
          'Não foi possível deletar usuário, ID deve ser informado.'
        )
      }

      const data = {
        name,
        email,
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

      await schema.validate(data, {
        abortEarly: false,
      })

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
          title: 'Erro ao atualizar usuário',
          description: error.message,
        })
      }
    } finally {
      setSubmitLoading(false)
    }
  }, [
    name,
    email,
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
      <h1>Gestão de usuários</h1>

      <Form>
        <Row>
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
        </Row>

        <Row>
          <div>
            <label>Criado em</label>
            <Input value={createdAt} name="createdAt" disabled />
          </div>
          <div>
            <span>Atualizado em</span>
            <Input value={updatedAt} name="updatedAt" disabled />
          </div>
        </Row>

        <Row>
          <CheckSession checked={isActive}>
            <div onClick={() => setIsActive(!isActive)}>
              {isActive && <FiCheck />}
            </div>
            <span>Ativo</span>
          </CheckSession>
          <CheckSession checked={isAdmin}>
            <div onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin && <FiCheck />}
            </div>
            <span>Administrador</span>
          </CheckSession>
        </Row>

        <ButtonRow align="end">
          <Button onClick={() => navigate('/users')} size="small">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteUser}
            size="small"
            loading={deleteLoading}
            backgroundColor={'#ff0101'}
          >
            Excluir
          </Button>
          <Button
            size="small"
            onClick={handleSubmit}
            loading={submitLoading}
            backgroundColor={'#009669'}
          >
            Confirmar
          </Button>
        </ButtonRow>
      </Form>
    </Container>
  )
}

export { AdminUsers }
