import { useCallback } from 'react'

import { ButtonComponent, Container } from './styles'
import { RowSession } from '../../components/Row/RowSession'
import { RowSessionColumn } from '../../components/Row/RowSessionColumn'
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
          <ButtonComponent onClick={() => handleToQuestionType()}>
            Criar Tipo de Questão
          </ButtonComponent>
        </RowSessionColumn>
      </RowSession>
    </Container>
  )
}
export { AdminQuestionsTypesList }
