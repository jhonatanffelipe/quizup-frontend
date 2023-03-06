import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiCamera } from 'react-icons/fi'

import { Container, Form, AvatarInput } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import avatarImg from '../../assets/avatar.png'
import api from '../../services/api'

const UserProfile = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors] = useState({})

  const { addToast } = useToast()
  const { user } = useAuth()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    setLoading(false)
  }

  const handleAvatarChenge = async (event) => {
    if (event.target?.files) {
      const data = new FormData()
      data.append('avatar', event.target?.files[0])

      await api.patch('/users/avatar', data).then(() => {
        addToast({
          type: 'success',
          title: 'Avatar alterado com sucesso',
        })
      })
    }
  }

  return (
    <Container>
      <AvatarInput>
        <img src={user.avatar ? user.avatar : avatarImg} alt="avatar" />
        <label htmlFor="avatar">
          <FiCamera size={25} />
          <input type="file" id="avatar" onChange={handleAvatarChenge} />
        </label>
      </AvatarInput>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" loading={loading}>
          Confirmar
        </Button>
      </Form>
    </Container>
  )
}

export { UserProfile }
