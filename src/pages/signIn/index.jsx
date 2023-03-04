import { useCallback, useState } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Backgound, Container, AnimationContainer, Form } from './styles'
import getValidationError from '../../utils/getValidationErros'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import Button from '../../components/Button'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setFormErros({})

      try {
        setLoading(true)
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Informe um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        const data = {
          email,
          password,
        }

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
          console.log(errors)
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
    },
    [email, password, addToast, signIn]
  )
  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form>
          <h1>Faça seu login</h1>

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim())
            }}
            error={formErrors.email}
          />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim())
            }}
            error={formErrors.password}
          />

          <Button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            loading={loading}
          >
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

export default SignIn
