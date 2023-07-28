import { useFormik } from 'formik'
import { INewPassword } from '../types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../UI/Header'
import InputControl from '../UI/InputControl/InputControl'

import { useContext, useEffect } from 'react'
import NewPasswordSchema from '../validators/newPasswordSchema'
import { useMutation } from 'react-query'
import { ToastContext } from '../context/ToastContext'
import { newPassword } from '../api/userApi'
import useError from '../hooks/useError'
import Button from '../UI/Button'

const initialValues: INewPassword = {
  password: '',
  confirmPassword: '',
}

export default function NewPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const toastContext = useContext(ToastContext)
  const { handleError } = useError()
  const newPasswordMutation = useMutation(newPassword, {
    onError: handleError,
  })

  const handleSubmit = async (values: INewPassword) => {
    await newPasswordMutation.mutateAsync({
      ...values,
      token: searchParams.get('token')!,
    })

    toastContext?.addSuccessToast({
      message: 'Password changed successfully',
    })
    navigate('/login')
  }

  const newPasswordForm = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: NewPasswordSchema,
  })

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate('/back')
    }
  }, [])

  return (
    <div>
      <Header
        text="Create new password for E-mail: "
        headlineText={searchParams.get('email')!}
      />
      <form className="container" onSubmit={newPasswordForm.handleSubmit}>
        <InputControl
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={newPasswordForm.values.password}
          onChange={newPasswordForm.handleChange}
          errorMessage={newPasswordForm.errors.password}
        />
        <InputControl
          label="Confirm Password"
          type="password"
          placeholder="Enter your password"
          name="confirmPassword"
          value={newPasswordForm.values.confirmPassword}
          onChange={newPasswordForm.handleChange}
          errorMessage={newPasswordForm.errors.confirmPassword}
          className="mb-3"
        />
        <Button isLoading={newPasswordMutation.isLoading}>
          Create new password
        </Button>
      </form>
    </div>
  )
}
