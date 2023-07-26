import React, { useContext, useEffect } from 'react'
import { ToastType } from '../types'
import { ToastContext } from '../context/ToastContext'
import '../sass/toast.scss'

const getColor = (className: string, type: ToastType) => {
  switch (type) {
    case 'success':
      return `${className}-success`
    case 'error':
      return `${className}-danger`
    case 'info':
      return `${className}-info`
    case 'warning':
      return `${className}-warning`
    default:
      return `${className}-primary`
  }
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  title: string
  message: string
  timestamp?: string
  show: boolean
  type: ToastType
  timeout?: number
  group?: string
  unique?: boolean
}

export default function Toast({
  title,
  message,
  timestamp,
  show,
  type,
  id,
  timeout,
  unique,
  group,
  ...rest
}: ToastProps) {
  const toastContext = useContext(ToastContext)

  const onClose = () => {
    toastContext?.removeToast(id)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (!timeout) return
    document.documentElement.style.setProperty('--timeout', `${timeout}ms`)
    timer = setTimeout(() => {
      toastContext?.removeToast(id)
    }, timeout)

    return () => timer && clearTimeout(timer)
  }, [id])

  return (
    <div
      className={`toast mb-2 ${show ? 'show' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...rest}
    >
      <div
        style={{ zIndex: 1000 }}
        className={`toast-header justify-content-between align-items-center text-light position-relative ${getColor(
          'bg',
          type
        )}`}
      >
        <span
          className={`grow-width-animation ${getColor('bg-light', type)}`}
        ></span>
        {/* <img src="..." className="rounded mr-2" alt="..."> */}
        <strong className="mr-auto">{title}</strong>
        <div>
          {timestamp && <small>{timestamp}</small>}
          <button
            type="button"
            className="close btn-close fs-6"
            data-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
      <div className={`toast-body ${getColor('text', type)}`}>{message}</div>
    </div>
  )
}
