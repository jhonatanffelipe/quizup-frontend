import { useCallback, useEffect, useState } from 'react'
import { FiUser, FiMail, FiCamera, FiLock } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Container, Form, AvatarInput } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import avatarImg from '../../assets/avatar.png'
import { getValidationError } from '../../utils/getValidationErros'
import { api } from '../../services/api'
import { AppError } from '../../utils/errors/AppError'

const UserProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { addToast } = useToast()
  const { user, token, signOut, updateContextData } = useAuth()
  const navigate = useNavigate()

  const handleShowProfile = useCallback(async () => {
    await api
      .get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((response) => {
        const user = {
          avatar: response.data.avatar,
          email: response.data.email,
          isAdmin: response.data.isAdmin,
          name: response.data.name,
        }

        setName(response.data.name)
        setEmail(response.data.email)
        setCurrentPassword('')
        setPassword('')
        setConfirmPassword('')
        updateContextData({ user, token })

        addToast({
          type: 'success',
          title: 'Usuário alterado com sucesso',
        })
      })
      .catch((error) => {
        throw new AppError(
          error.response?.data?.error.message ||
            error.response?.data?.error ||
            'Erro ao listar dodos do usuário. Por favor tente mais tarde',
          error.response?.status || 400
        )
      })
  }, [addToast, updateContextData, token])

  const handleAvatarChenge = useCallback(
    async (event) => {
      setLoading(true)
      if (event.target?.files) {
        const data = new FormData()
        data.append('avatar', event.target?.files[0])

        await api
          .patch('/users/avatar', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          .then(async () => {
            handleShowProfile()
          })
          .catch((error) => {
            if (error.statusCode === 401) {
              addToast({
                type: 'error',
                title: 'Erro de autenticação',
                description: error.response?.data?.error
                  ? error.response?.data?.error
                  : 'Erro ao tentar atualizar usuário. Por favor tente mais tarde',
              })
              signOut()
            } else {
              addToast({
                type: 'error',
                title: 'Erro ao atualizar avatar',
                description: error.response?.data?.error
                  ? error.response?.data?.error
                  : 'Erro ao tentar atualizar usuário. Por favor tente mais tarde',
              })
            }
          })
      }
      setLoading(false)
    },
    [token.accessToken, handleShowProfile, addToast, signOut]
  )

  const handleSubmit = useCallback(async () => {
    setFormErros({})
    try {
      setLoading(true)
      const data = {
        name,
        email,
        currentPassword,
        password,
        confirmPassword,
      }

      let schema = {}

      if (data.currentPassword || data.password || data.confirmPassword) {
        schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Informe um e-mail válido'),

          currentPassword: Yup.string().required('Senha atual obrigatório'),
          password: Yup.string().required('Nova senha obrigatório'),
          confirmPassword: Yup.string()
            .required('Confirmação de senha obrigatória')
            .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
        })
      } else {
        schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Informe um e-mail válido'),
        })
      }

      data.email = data.email.trim()

      await schema.validate(data, {
        abortEarly: false,
      })

      await api
        .put(
          '/users/profile',
          {
            name: data.name,
            email: data.email,
            currentPassword: data.currentPassword,
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        )
        .then()
        .catch((error) => {
          throw new AppError(
            error.response?.data?.error.message ||
              error.response?.data?.error ||
              'Erro ao atualizar dodos do usuário. Por favor tente mais tarde',
            error.response?.status || 400
          )
        })

      handleShowProfile()
      navigate('/')
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
          title: 'Erro ao atualizar usuário',
          description: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }, [
    addToast,
    confirmPassword,
    currentPassword,
    email,
    handleShowProfile,
    name,
    navigate,
    password,
    signOut,
    token.accessToken,
  ])

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setCurrentPassword('')
    setPassword('')
    setConfirmPassword('')
  }, [user])

  return (
    <Container>
      <AvatarInput>
        <div>
          <img src={user.avatar ? user.avatar : avatarImg} alt="avatar" />
        </div>
        <label htmlFor="avatar">
          <FiCamera size={20} />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChenge}
          />
        </label>
      </AvatarInput>

      <div>
        <Form>
          <h2>Meu Perfil</h2>
          <div>
            <Input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              icon={FiUser}
              placeholder="Nome"
              error={formErrors?.name}
            />

            <Input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              icon={FiMail}
              placeholder="E-mail"
              error={formErrors?.email}
            />
          </div>

          <div>
            <Input
              value={currentPassword}
              name="currentPassword"
              onChange={(e) => setCurrentPassword(e.target.value)}
              icon={FiLock}
              placeholder="Senha atual"
              error={formErrors?.currentPassword}
              autoComplete="off"
              type="password"
            />

            <Input
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              icon={FiLock}
              placeholder="Nova senha"
              error={formErrors?.password}
              autoComplete="off"
              type="password"
            />

            <Input
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={FiLock}
              placeholder="Confirmar senha"
              error={formErrors?.confirmPassword}
              autoComplete="off"
              type="password"
            />
          </div>

          <Button type="submit" onClick={handleSubmit} loading={loading}>
            Confirmar
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export { UserProfile }
