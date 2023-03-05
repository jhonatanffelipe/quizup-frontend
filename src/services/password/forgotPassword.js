import api from '../api'

export const forgotPasword = async ({ email }) => {
  return await api.post('/password/forgot', {
    email,
  })
}
