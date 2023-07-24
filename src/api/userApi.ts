import api from '.'
import { ILoginUser, INewPasswordPayload, IRegisterUser } from '../types'

const registerUser = async (user: IRegisterUser) => {
  const response = await api.post('/register', user)

  return response.data
}

const loginUser = async (user: ILoginUser) => {
  const response = await api.post('/login', user)

  return response.data
}

const getUser = async () => {
  const response = await api.get('/profile')
  console.log(response.data, 'response.data')
  return response.data
}

const resetPassword = async (email: string) => {
  const response = await api.post('/reset-password', { email })

  return response.data
}

const newPassword = async (newPassword: INewPasswordPayload) => {
  const response = await api.post(`/new-password?token=${newPassword.token}`, {
    password: newPassword.password,
    confirmPassword: newPassword.confirmPassword,
  })

  return response.data
}

export { registerUser, loginUser, getUser, resetPassword, newPassword }
