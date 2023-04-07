import { useCallback } from 'react'

import { Container } from './styles'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const AdminQuestionsList = () => {
  const navigate = useNavigate()

  const handleToCategory = useCallback(
    (id) => {
      navigate(`/question${id ? '/' + id : ''}`)
    },
    [navigate]
  )

  return (
    <Container>
      <h1>Questões</h1>

      <RowSession>
        <RowSessionColumn></RowSessionColumn>
        <RowSessionColumn align="end">
          <Button size="small" onClick={() => handleToCategory()}>
            Criar Questão
          </Button>
        </RowSessionColumn>
      </RowSession>
    </Container>
  )
}
export { AdminQuestionsList }
