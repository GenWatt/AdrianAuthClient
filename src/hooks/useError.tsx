import { AxiosError } from 'axios'
import { useContext } from 'react'
import { IApiResponse } from '../types'
import { ToastContext } from '../context/ToastContext'

export default function useError() {
  const toastContext = useContext(ToastContext)

  const handleError = (error: any) => {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<IApiResponse>
      return toastContext?.addErrorToast({
        message: axiosError.response?.data.message || 'Something went wrong',
      })
    }

    toastContext?.addErrorToast({ message: 'Something went wrong' })
  }

  return { handleError }
}
