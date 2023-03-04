import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'

import { Title } from './styles'

const Dashboard = () => {
  const { signOut } = useAuth()
  return (
    <>
      <Title>Dashboard</Title>

      <Button onClick={signOut}>Sair</Button>
    </>
  )
}

export default Dashboard
