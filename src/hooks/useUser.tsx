import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { IApiResponse, IUserResponse } from '../types'
import useLocalStorage from './useLocalStorage'

export default function useUser(navigateToLogin: boolean = true) {
  const navigate = useNavigate()
  const toastContext = useContext(ToastContext)
  const queryClient = useQueryClient()
  const localStorage = useLocalStorage()

  const handleError = (error: AxiosError<IApiResponse>) => {
    if (error.response?.status === 401) {
     
      if (navigateToLogin) {
        queryClient.removeQueries('user')
        toastContext?.addErrorToast({
          message: 'Your session has expired',
          unique: true,
          group: 'Auth',
        })
        return navigate('/login')
      }

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

  useEffect(() => {
    if (userQuery.data?.user) {
      localStorage.setObject('userSettings', userQuery.data?.user.userSettings)
    }
  }, [userQuery.data?.user])

  return userQuery
}
