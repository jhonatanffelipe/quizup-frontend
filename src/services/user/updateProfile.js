import AppError from '../../utils/errors/AppError'
import { api } from '../api'

const updateProfile = async ({
  accessToken,
  name,
  email,
  currentPassword,
  password,
  confirmPassword,
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  return await api
    .put(
      '/users/profile',
      { name, email, currentPassword, password, confirmPassword },
      { headers }
    )
    .then((response) => response)
    .catch((error) => {
      if (error.response?.data?.error) {
        throw new AppError(error.response?.data?.error, error.response?.status)
      } else {
        throw Error(
          error.response?.data?.error
            ? error.response?.data?.error
            : 'Erro ao tentar atualizar usuário. Por favor tente mais tarde'
        )
      }
    })
}

export { updateProfile }
