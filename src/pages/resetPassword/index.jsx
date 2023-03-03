import { Backgound, Container, AnimationContainer, Form } from './styles'
import { FiArrowLeft, FiLock, FiUnlock } from 'react-icons/fi'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form>
          <h1>Alterar Senha</h1>

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <Input
            name="confirmPassword"
            icon={FiUnlock}
            placeholder="Confirmar senha"
            type="password"
          />

          <button>Confirmar</button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Ir para Login
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export default ResetPassword
