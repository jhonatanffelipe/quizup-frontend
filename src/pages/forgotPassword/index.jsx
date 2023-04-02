import { Backgound, Container, AnimationContainer, Form } from './styles'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import { Input } from '../../components/Input'
import { getValidationError } from '../../utils/getValidationErros'
import { useToast } from '../../hooks/toast'
import { Button } from '../../components/Button'
import { forgotPasword } from '../../services/password/forgotPassword'

const ForgoPassword = () => {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErros] = useState({})

  const { handleSubmit, register } = useForm()

  const { addToast } = useToast()

  const onSubmit = async (data) => {
    setFormErros({})

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

      await forgotPasword({
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
        setFormErros(errors)
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
  }

  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="QuizEdu" />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Recuperar senha</h1>

          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            register={register}
            error={formErrors.email}
          />

          <Button type="submit" loading={loading}>
            Enviar
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

export { ForgoPassword }
