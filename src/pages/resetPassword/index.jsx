import { useEffect, useState } from 'react'
import { FiArrowLeft, FiLock, FiUnlock } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import {
  Backgound,
  Container,
  AnimationContainer,
  Form,
  ButtonComponent,
} from './styles'
import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import { useToast } from '../../hooks/toast'
import { getValidationError } from '../../utils/getValidationErros'
import { api } from '../../services/api'
import { useCallback } from 'react'

const ResetPassword = () => {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const { search } = useLocation()
  const { addToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    setToken(search.split('?token=')[1])
  }, [search])

  const handleSubmit = useCallback(async () => {
    setFormErrors({})

    const data = {
      password,
      confirmPassword,
    }

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

      await api
        .put('/password/reset', {
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
        .then((response) => response)
        .catch((error) => {
          throw Error(
            error.response?.data?.error
              ? error.response?.data?.error
              : 'Erro ao tentar alterar senha. Por favor tente mais tarde'
          )
        })

      addToast({
        type: 'success',
        title: 'Solicitação recebida com sucesso',
        description: 'Senha alterada com sucesso, se autentique na aplicação',
      })

      setPassword('')
      setConfirmPassword('')
      navigate('/')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErrors(errors)
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
  }, [addToast, confirmPassword, password, token, navigate])

  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="QuizUp" />

        <Form>
          <h1>Alterar Senha</h1>

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
          />

          <Input
            name="confirmPassword"
            icon={FiUnlock}
            placeholder="Confirmar senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={formErrors.confirmPassword}
          />

          <ButtonComponent
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Confirmar
          </ButtonComponent>
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
