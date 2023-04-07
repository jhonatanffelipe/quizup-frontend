import { useCallback, useState } from 'react'
import { FiArrowLeft, FiLock, FiMail, FiUnlock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import {
  Backgound,
  Container,
  AnimationContainer,
  Form,
  ButtonComponent,
} from './styles'
import { getValidationError } from '../../utils/getValidationErros'
import { useToast } from '../../hooks/toast'
import { api } from '../../services/api'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setFormErros({})

    try {
      setLoading(true)

      const data = {
        name,
        email,
        password,
        confirmPassword,
      }

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string()
          .required('Confirmação de senha obrigatória')
          .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await api
        .post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
        .then((response) => response)
        .catch((error) => {
          throw Error(
            error.response?.data?.error
              ? error.response?.data?.error
              : 'Erro ao tentar criar usuário. Por favor tente mais tarde'
          )
        })

      addToast({
        type: 'success',
        title: 'Usuário criado com sucesso',
      })

      handleResetForm()
      navigate('/')
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

  const handleResetForm = useCallback(() => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }, [])

  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="QuizUp" />

        <Form>
          <h1>Criar Conta</h1>

          <Input
            onChange={(e) => setName(e.target.value)}
            name="name"
            icon={FiUser}
            placeholder="Nome"
            error={formErrors.name}
          />

          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            error={formErrors.email}
          />

          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
            error={formErrors.password}
            autoComplete="off"
          />

          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            icon={FiUnlock}
            placeholder="Confirmar senha"
            type="password"
            error={formErrors.confirmPassword}
            autoComplete="off"
          />

          <ButtonComponent
            type="submit"
            onClick={handleSubmit}
            loading={loading}
          >
            Entrar
          </ButtonComponent>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export { SignUp }
