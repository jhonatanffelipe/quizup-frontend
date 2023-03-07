import { api } from '../api'

const auth = async ({ email, password }) => {
  return await api.post('auth', {
    email,
    password,
  })
}

export { auth }
