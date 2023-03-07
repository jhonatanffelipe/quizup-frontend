import { api } from '../api'

const resetPassword = async ({ token, password, confirmPassword }) => {
  return await api
    .put('/password/reset', {
      token,
      password,
      confirmPassword,
    })
    .then((response) => response)
    .catch((error) => {
      throw Error(
        error.response?.data?.error
          ? error.response?.data?.error
          : 'Erro ao tentar alterar senha. Por favor tente mais tarde'
      )
    })
}

export { resetPassword }
