import {
  Backgound,
  Container,
  AnimationContainer,
  Form,
  ButtonComponent,
} from './styles'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import { getValidationError } from '../../utils/getValidationErros'
import { useToast } from '../../hooks/toast'
import { api } from '../../services/api'

const ForgoPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const { addToast } = useToast()

  const handleSubmit = useCallback(async () => {
    setFormErrors({})

    const data = {
      email,
    }

    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Informe um e-mail válido'),
      })

      data.email = data.email.trim()

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/password/forgot', {
        email: data.email,
      })

      addToast({
        type: 'success',
        title: 'Solicitação recebida com sucesso',
        description: 'Verifique sua caixa de entrada',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationError(error)
        setFormErrors(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro na solicitação',
        description:
          'Ocorreu um erro ao tentar recuperar senha, por favor cheque o e-mail informado',
      })
    } finally {
      setLoading(false)
    }
  }, [email, addToast])

  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="QuizUp" />

        <Form>
          <h1>Recuperar senha</h1>

          <Input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            icon={FiMail}
            placeholder="E-mail"
            error={formErrors.email}
          />

          <ButtonComponent
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Enviar
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

export { ForgoPassword }
