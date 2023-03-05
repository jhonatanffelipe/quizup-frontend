import { useState } from 'react'
import { FiArrowLeft, FiLock, FiMail, FiUnlock, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Backgound, Container, AnimationContainer, Form } from './styles'
import getValidationError from '../../utils/getValidationErros'
import { useToast } from '../../hooks/toast'
import { createUser } from '../../services/user/createUser'
import Button from '../../components/Button'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { handleSubmit, register, reset } = useForm()

  const { addToast } = useToast()

  const onSubmit = async (data) => {
    setFormErros({})

    try {
      setLoading(true)

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string()
          .required('Confirmação de sena obrigatória')
          .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      addToast({
        type: 'success',
        title: 'Usuário criado com sucesso',
        description: 'Retorne a tela de login para acessar a aplicação',
      })

      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErros(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro na ao criar usuário',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Criar Conta</h1>

          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
            register={register}
            error={formErrors.name}
          />

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            register={register}
            error={formErrors.email}
          />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
            register={register}
            error={formErrors.password}
          />

          <Input
            name="confirmPassword"
            icon={FiUnlock}
            placeholder="Confirmar senha"
            type="password"
            register={register}
            error={formErrors.confirmPassword}
          />

          <Button type="submit" loading={loading}>
            Entrar
          </Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export default SignUp
