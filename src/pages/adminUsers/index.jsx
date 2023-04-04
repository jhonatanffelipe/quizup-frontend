import { useCallback, useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

import { Container, Form, Row, CheckSession } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { AppError } from '../../utils/errors/AppError'
import { useToast } from '../../hooks/toast'

const AdminUsers = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { token, signOut } = useAuth()
  const { addToast } = useToast()
  const location = useLocation()

  const handleRequestUser = useCallback(async () => {
    setLoading(true)

    try {
      const userId = location.pathname.replace('/users/', '')
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
      setLoading(false)
    }
  }, [addToast, signOut, token.accessToken, location.pathname])

  const handleSubmit = useCallback(() => {
    console.log({
      name,
      email,
      isActive,
      isAdmin,
    })
    setFormErros({})
  }, [name, email, isActive, isAdmin])

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
            <label>Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Nome"
              error={formErrors?.name}
            />
          </div>
          <div>
            <label>E-mail</label>
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
        <Row>
          <Button onClick={handleSubmit} loading={loading}>
            Confirmar
          </Button>
        </Row>
      </Form>
    </Container>
  )
}

export { AdminUsers }
