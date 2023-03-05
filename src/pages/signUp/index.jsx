import { FiArrowLeft, FiLock, FiMail, FiUnlock, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logoWhite.png'
import backgroundImg from '../../assets/backgroundImg.svg'
import Input from '../../components/Input'
import { Backgound, Container, AnimationContainer, Form } from './styles'

const SignUp = () => {
  return (
    <Container>
      <Backgound>
        <img src={backgroundImg} alt="background" />
      </Backgound>
      <AnimationContainer>
        <img src={logoImg} alt="Turtle Quiz" />

        <Form>
          <h1>Criar Conta</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

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
          Voltar
        </Link>
      </AnimationContainer>
    </Container>
  )
}

export default SignUp
