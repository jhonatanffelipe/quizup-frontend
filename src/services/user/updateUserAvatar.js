import AppError from '../../utils/errors/AppError'
import { api } from '../api'

const updateUserAvatar = async ({ accessToken, data }) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  }

  return await api
    .patch('/users/avatar', data, { headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response?.data?.error) {
        throw new AppError(error.response?.data?.error, error.response?.status)
      } else {
        throw new AppError(
          'Erro ao tentar atualizar avatar do usuário. Por favor tente mais tarde',
          400
        )
      }
    })
}

export { updateUserAvatar }
