import React from 'react'
import Loader from './Loader'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  isLoading,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = () => {
    switch (variant) {
      case 'primary':
        return 'btn btn-primary text-light'
      case 'secondary':
        return 'btn btn-secondary'
      case 'danger':
        return 'btn btn-danger'
      case 'success':
        return 'btn btn-success'
      case 'warning':
        return 'btn btn-warning'
      case 'info':
        return 'btn btn-info'
      default:
        return 'btn btn-primary'
    }
  }

  return (
    <button type={type} disabled={isLoading} className={classes()} {...rest}>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
