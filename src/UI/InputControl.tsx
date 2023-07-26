import React, { forwardRef } from 'react'

interface InputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}

const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <div className="mt-3 flex">
        <label htmlFor="username" className="form-label">
          {label}
        </label>

        <input ref={ref} className="form-control" {...props} />

        {errorMessage ? (
          <div className="text-danger">
            <p>{errorMessage}</p>
          </div>
        ) : null}
      </div>
    )
  }
)

export default InputControl
