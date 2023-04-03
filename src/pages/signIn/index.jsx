import { useState } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import { Backgound, Container, AnimationContainer, Form } from './styles'
import { getValidationError } from '../../utils/getValidationErros'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { Button } from '../../components/Button'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { handleSubmit, register } = useForm()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const onSubmit = async (data) => {
    setFormErros({})

    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })

      data.email = data.email.trim()

      await schema.validate(data, {
        abortEarly: false,
      })

      await signIn({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErros(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credênciais',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="QuizEdu" />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu login</h1>

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
            autoComplete="off"
            error={formErrors.password}
          />

          <Button type="submit" loading={loading}>
            Entrar
          </Button>

          <Link to={'/forgot-password'}>Esqueci minha senha</Link>
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </AnimationContainer>

      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
    </Container>
  )
}

export { SignIn }
