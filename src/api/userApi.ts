import api from '.'
import { ILoginUser, INewPasswordPayload, IRegisterUser } from '../types'

const registerUser = async (user: IRegisterUser) => {
  const response = await api.post('/register', user)

  return response.data
}

const loginUser = async (user: ILoginUser) => {
  const url = user.callbackUrl
    ? `/login?callbackUrl=${user.callbackUrl}`
    : '/login'
  const response = await api.post(url, user)

  return response.data
}

const getUser = async () => {
  const response = await api.get('/profile')

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

const setUserProfileImage = async (image: File) => {
  const formData = new FormData()
  formData.append('profilePicture', image)

  const response = await api.put('/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

const deactivateAccountApi = async () => {
  const response = await api.put('/deactivate')

  return response.data
}

const deleteAccountApi = async () => {
  const response = await api.delete('/delete-account')

  return response.data
}

const logoutUser = async () => {
  const response = await api.post('/logout')

  return response.data
}

const setUserCoverImage = async (image: File) => {
  const formData = new FormData()
  formData.append('coverPicture', image)

  const response = await api.put('/cover-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export {
  registerUser,
  loginUser,
  getUser,
  resetPassword,
  newPassword,
  setUserProfileImage,
  deactivateAccountApi,
  deleteAccountApi,
  logoutUser,
  setUserCoverImage,
}
