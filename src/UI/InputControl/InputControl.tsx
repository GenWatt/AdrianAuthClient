import React, { forwardRef, useEffect, useId } from 'react'
import Text from '../Text'
import { Eye } from 'react-bootstrap-icons'
import useInputControl from './useInputControl'
import { Tooltip } from 'react-tooltip'

export interface InputControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}

const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({ label, errorMessage, className, type, id, ...props }, ref) => {
    const inputDataId = useId()
    const { clsses, togglePassword, isShowPassword, isPasswordInput } =
      useInputControl()

    useEffect(() => {
      if (!isPasswordInput(inputDataId) && isShowPassword) {
        togglePassword(inputDataId)
      }
    }, [])

    return (
      <div className="mt-3 flex">
        <label htmlFor={id} className="form-label">
          {label}
        </label>

        <div className="position-relative">
          <input
            data-id={inputDataId}
            type={type}
            ref={ref}
            className={clsses(className)}
            {...props}
          />

          {type === 'password' && (
            <Eye
              id="tooglePasswordTooltip"
              style={{ cursor: 'pointer' }}
              className="text-primary position-absolute end-0 top-50 translate-middle"
              size={20}
              onClick={() => togglePassword(inputDataId)}
            />
          )}
        </div>
        <Tooltip className="bg-primary" anchorSelect="#tooglePasswordTooltip">
          {isShowPassword ? 'Hide password' : 'Show password'}
        </Tooltip>
        {errorMessage && (
          <div className="text-danger">
            <Text type="body2">{errorMessage}</Text>
          </div>
        )}
      </div>
    )
  }
)

export default InputControl
