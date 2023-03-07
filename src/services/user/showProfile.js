import { api } from '../api'

const showProfile = async ({ accessToken }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  return await api
    .get('/users/profile', { headers })
    .then((response) => response)
    .catch((error) => {
      throw Error(
        error.response?.data?.error
          ? {
              status: error.response?.status,
              message: error.response?.data?.error,
            }
          : {
              status: 400,
              message:
                'Erro ao listar dodos do usuário. Por favor tente mais tarde',
            }
      )
    })
}

export { showProfile }
