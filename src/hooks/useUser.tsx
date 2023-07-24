import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { IUserResponse } from '../types'

export default function useUser() {
  const navigate = useNavigate()
  const toastContext = useContext(ToastContext)

  const handleError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      navigate('/login')
      toastContext?.addErrorToast('Your session has expired')
    }
  }

  const userQuery = useQuery<IUserResponse, AxiosError>('user', getUser, {
    retry: false,
    refetchOnMount: false,
    onError: handleError,
  })

  return userQuery
}
