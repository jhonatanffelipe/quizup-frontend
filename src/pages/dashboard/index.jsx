import { ButtonComponent, Container } from './styles'
import { useAuth } from '../../hooks/auth'

const Dashboard = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <h1>Dashboard</h1>
      <ButtonComponent onClick={signOut}>Sair</ButtonComponent>
    </Container>
  )
}

export { Dashboard }
