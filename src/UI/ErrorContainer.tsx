import { useContext } from 'react'
import Toast from './Toast'
import { ToastContext } from '../context/ToastContext'

export default function ErrorContainer() {
  const toastContext = useContext(ToastContext)

  return (
    <div
      className="position-absolute"
      style={{ top: '0.5rem', right: '0.5rem' }}
    >
      {toastContext?.toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
