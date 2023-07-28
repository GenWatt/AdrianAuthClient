import { useState } from 'react'

export default function useInputControl() {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const isPasswordInput = (inputDataId: string) => {
    const input = document.querySelector<HTMLInputElement>(
      `input[data-id="${inputDataId}"]`
    )

    if (input) {
      return input.type === 'password'
    }

    return false
  }

  const clsses = (className?: string) => {
    return `form-control border border-primary ${className ? className : ''}`
  }

  const togglePassword = (inputDataId: string) => {
    const input = document.querySelector<HTMLInputElement>(
      `input[data-id="${inputDataId}"]`
    )

    if (input) {
      if (input.type === 'password') {
        input.type = 'text'
        setIsShowPassword(true)
      } else {
        input.type = 'password'
        setIsShowPassword(false)
      }
    }
  }

  return {
    clsses,
    togglePassword,
    isShowPassword,
    setIsShowPassword,
    isPasswordInput,
  }
}
