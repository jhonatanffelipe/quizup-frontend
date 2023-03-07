import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiCamera, FiLock } from 'react-icons/fi'

import { Container, Form, AvatarInput } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import avatarImg from '../../assets/avatar.png'
import { updateUserAvatar } from '../../services/user/updateUserAvatar'
import { showProfile } from '../../services/user/showProfile'

const UserProfile = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { addToast } = useToast()
  const { user, token, signOut, setData } = useAuth()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const onSubmit = async (data) => {
    setFormErros({})
    setLoading(true)
    console.log(data)
    console.log('Altera nome e e-mail')
    if (data.confirmPassword) {
      console.log('Altera senha')
    }
    setLoading(false)
  }

  const handleAvatarChenge = useCallback(
    async (event) => {
      if (event.target?.files) {
        const data = new FormData()
        data.append('avatar', event.target?.files[0])

        await updateUserAvatar({ accessToken: token.accessToken, data })
          .then(async () => {
            await showProfile({ accessToken: token.accessToken }).then(
              (response) => {
                const user = {
                  avatar: response.data.avatar,
                  email: response.data.email,
                  isAdmin: response.data.isAdmin,
                  name: response.data.name,
                }
                setData({ user, token })

                addToast({
                  type: 'success',
                  title: 'Avatar alterado com sucesso',
                })
              }
            )
          })
          .catch((error) => {
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
          })
      }
    },
    [addToast, signOut, setData, token]
  )

  return (
    <Container>
      <AvatarInput>
        <img src={user.avatar ? user.avatar : avatarImg} alt="avatar" />
        <label htmlFor="avatar">
          <FiCamera size={25} />
          <input type="file" id="avatar" accept="image/*"  onChange={handleAvatarChenge} />
        </label>
      </AvatarInput>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Meu Perfil</h2>
        <div>
          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
            register={register}
            error={formErrors?.name}
          />

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            register={register}
            error={formErrors?.email}
          />
        </div>

        <div>
          <Input
            name="currentPassword"
            icon={FiLock}
            placeholder="Senha atual"
            register={register}
            error={formErrors?.currentPassword}
          />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Nova senha"
            register={register}
            error={formErrors?.password}
          />

          <Input
            name="confirmPassword"
            icon={FiLock}
            placeholder="Nova senha"
            register={register}
            error={formErrors?.confirmPassword}
          />
        </div>

        <Button type="submit" loading={loading}>
          Confirmar
        </Button>
      </Form>
    </Container>
  )
}

export { UserProfile }
