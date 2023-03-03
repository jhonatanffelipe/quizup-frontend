import { Backgound, Container, AnimationContainer, Form } from './styles'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <Container>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <button>Confirmar</button>

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
