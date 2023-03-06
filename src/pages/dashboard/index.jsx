import { Button } from '../../components/Button'
import { Container } from './styles'
import { useAuth } from '../../hooks/auth'

const Dashboard = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <h1>Dashboard</h1>
      <Button onClick={signOut}>Sair</Button>
    </Container>
  )
}

export { Dashboard }
