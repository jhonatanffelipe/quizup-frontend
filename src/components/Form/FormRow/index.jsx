import { Container } from './styles'

const FormRow = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export { FormRow }
