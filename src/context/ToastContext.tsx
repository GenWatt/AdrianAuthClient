import React, { useState, ReactNode, useCallback } from 'react'
import { IToastContext, IToastOptions, ToastType } from '../types'
import { ToastProps } from '../UI/Toast'

export const ToastContext = React.createContext<IToastContext | null>(null)

const toastsArray: ToastProps[] = []

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const isGroupExists = (group?: string) => {
    return toastsArray.some((toast) => toast.group === group)
  }

  const addToast = useCallback(
    async (toast: ToastProps) => {
      if (toast.unique && isGroupExists(toast.group)) return

      toast.id = Date.now().toString()
      setToasts((prev) => [...prev, toast])
      toastsArray.push(toast)
    },
    [toasts]
  )

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const addErrorToast = ({
    message,
    timeout = 5000,
    group = '',
    unique = false,
  }: IToastOptions) => {
    addToast({
      title: 'Error',
      message: message,
      type: ToastType.Error,
      show: true,
      id: Date.now().toString(),
      timeout,
      group,
      unique,
    })
  }

  const addSuccessToast = ({
    message,
    timeout = 5000,
    group = '',
    unique = false,
  }: IToastOptions) => {
    addToast({
      title: 'Success',
      message: message,
      type: ToastType.Success,
      show: true,
      id: Date.now().toString(),
      timeout,
      group,
      unique,
    })
  }

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, addErrorToast, addSuccessToast }}
    >
      {children}
    </ToastContext.Provider>
  )
}
