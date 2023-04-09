import { useCallback } from 'react'

import { Container } from './styles'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const AdminQuestionsTypesList = () => {
  const navigate = useNavigate()

  const handleToQuestionType = useCallback(
    (id) => {
      navigate(`/question-type${id ? '/' + id : ''}`)
    },
    [navigate]
  )

  return (
    <Container>
      <h1>Tipos de Questões</h1>

      <RowSession>
        <RowSessionColumn></RowSessionColumn>
        <RowSessionColumn align="end">
          <Button onClick={() => handleToQuestionType()}>
            Criar Tipos de Questões
          </Button>
        </RowSessionColumn>
      </RowSession>
    </Container>
  )
}
export { AdminQuestionsTypesList }
