import { api } from '../api'

const forgotPasword = async ({ email }) => {
  return await api.post('/password/forgot', {
    email,
  })
}

export { forgotPasword }
