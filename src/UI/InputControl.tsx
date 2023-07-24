import React from 'react'

interface InputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}

export default function InputControl({
  label,
  errorMessage,
  ...props
}: InputControlProps) {
  return (
    <div className="mt-3 flex">
      <label htmlFor="username" className="form-label">
        {label}
      </label>
      <input className="form-control" {...props} />

      {errorMessage ? (
        <div className="text-danger">
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </div>
  )
}
