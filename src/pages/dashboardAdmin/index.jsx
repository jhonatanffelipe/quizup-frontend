import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'

import { Container, Content, Title } from './styles'

const DashboardAdmin = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <Content>
        <Title>Dashboard Admin</Title>
        <Button onClick={signOut}>Sair</Button>
      </Content>
    </Container>
  )
}

export default DashboardAdmin
