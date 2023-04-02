import { useEffect, useState } from 'react'
import { FiArrowLeft, FiLock, FiUnlock } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Backgound, Container, AnimationContainer, Form } from './styles'
import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import { useToast } from '../../hooks/toast'
import { Button } from '../../components/Button'
import { resetPassword } from '../../services/password/resetPassword'
import { getValidationError } from '../../utils/getValidationErros'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const [token, setToken] = useState('')

  const { search } = useLocation()

  const { handleSubmit, register, reset } = useForm()

  const { addToast } = useToast()

  useEffect(() => {
    setToken(search.split('?token=')[1])
  }, [search])

  const onSubmit = async (data) => {
    setFormErros({})

    try {
      setLoading(true)
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string()
          .required('Confirmação de senha obrigatória')
          .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      addToast({
        type: 'success',
        title: 'Solicitação recebida com sucesso',
        description:
          'Senha alterada com sucesso, volte para a tela de login e se autentique na aplicação',
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
        title: 'Erro ao alterar senha',
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
        <img src={logoImg} alt="QuizEdu" />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Alterar Senha</h1>

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
            Confirmar
          </Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Ir para Login
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export { ResetPassword }
