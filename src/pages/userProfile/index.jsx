import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiCamera } from 'react-icons/fi'

import { Container, Form } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import avatarImg from '../../assets/avatar.png'

const UserProfile = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

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

  return (
    <Container>
      <div>
        <img src={user.avatar ? user.avatar : avatarImg} alt="avatar" />
        <button className="update-avatar">
          <FiCamera />
        </button>
      </div>
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
