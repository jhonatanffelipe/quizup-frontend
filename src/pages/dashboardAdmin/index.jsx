import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import { Container, Content, Title } from './styles'

const DashboardAdmin = () => {
  const { signOut } = useAuth()
  const { addToast } = useToast()

  const adiciona = () => {
    addToast({
      type: 'error',
      title: 'Erro na autenticação',
      description: 'Ocorreu um erro ao fazer login, cheque as credênciais',
    })
  }
  return (
    <Container>
      <Content>
        <Title>Dashboard Admin</Title>
        <Button onClick={signOut}>Sair</Button>
        <Button onClick={adiciona}>Adicionar toast</Button>
      </Content>
    </Container>
  )
}

export default DashboardAdmin
