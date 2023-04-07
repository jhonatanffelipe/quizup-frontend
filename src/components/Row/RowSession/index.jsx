import { Container } from './styles'

const RowSession = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export { RowSession }
