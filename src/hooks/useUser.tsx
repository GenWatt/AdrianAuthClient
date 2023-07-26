import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { IApiResponse, IUserResponse } from '../types'

export default function useUser() {
  const navigate = useNavigate()
  const toastContext = useContext(ToastContext)

  const handleError = (error: AxiosError<IApiResponse>) => {
    if (error.response?.status === 401) {
      navigate('/login')
      toastContext?.addErrorToast({
        message: 'Your session has expired',
        unique: true,
        group: 'Auth',
      })

      return
    }

    toastContext?.addErrorToast({
      message: error.response?.data.message || error.message,
      unique: true,
      group: 'User',
    })
  }

  const userQuery = useQuery<IUserResponse, AxiosError<IApiResponse>>(
    'user',
    getUser,
    {
      retry: false,
      refetchOnMount: false,
      onError: handleError,
    }
  )

  return userQuery
}
