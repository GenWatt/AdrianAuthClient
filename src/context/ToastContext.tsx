import React, { useState, ReactNode } from 'react'
import { IToastContext, ToastType } from '../types'
import { ToastProps } from '../UI/Toast'

export const ToastContext = React.createContext<IToastContext | null>(null)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: ToastProps) => {
    toast.id = Date.now().toString()
    setToasts((prev) => [...prev, toast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const addErrorToast = (message: string, timeout: number = 5000) => {
    addToast({
      title: 'Error',
      message: message,
      type: ToastType.Error,
      show: true,
      id: Date.now().toString(),
      timeout,
    })
  }

  const addSuccessToast = (message: string, timeout: number = 5000) => {
    addToast({
      title: 'Success',
      message: message,
      type: ToastType.Success,
      show: true,
      id: Date.now().toString(),
      timeout,
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
