import { api } from '../api'

const createUser = async ({ name, email, password, confirmPassword }) => {
  return await api
    .post('/users', {
      name,
      email,
      password,
      confirmPassword,
    })
    .then((response) => response)
    .catch((error) => {
      throw Error(
        error.response?.data?.error
          ? error.response?.data?.error
          : 'Erro ao tentar criar usuário. Por favor tente mais tarde'
      )
    })
}

export { createUser }
