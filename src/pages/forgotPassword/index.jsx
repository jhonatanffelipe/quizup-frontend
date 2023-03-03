import { Backgound, Container, AnimationContainer, Form } from './styles'
import { FiArrowLeft, FiMail } from 'react-icons/fi'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

const ForgoPassword = () => {
  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form>
          <h1>Recuperar senha</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <button>Enviar</button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export default ForgoPassword
