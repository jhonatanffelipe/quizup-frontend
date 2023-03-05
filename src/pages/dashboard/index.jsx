import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'

import { Container, Content, Title } from './styles'

const Dashboard = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <Content>
        <Title>Dashboard</Title>
        <Button onClick={signOut}>Sair</Button>
      </Content>
    </Container>
  )
}

export default Dashboard
