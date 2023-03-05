import api from '../api'

export const auth = async ({ email, password }) => {
  return await api.post('auth', {
    email,
    password,
  })
}
