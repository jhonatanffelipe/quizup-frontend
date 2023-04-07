import { Container } from './styles'

const RowSessionColumn = ({ align, children, ...rest }) => {
  return (
    <Container align={align} {...rest}>
      {children}
    </Container>
  )
}

export { RowSessionColumn }
