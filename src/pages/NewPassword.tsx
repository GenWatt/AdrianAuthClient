import { useFormik } from 'formik'
import { INewPassword } from '../types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../UI/Header'
import InputControl from '../UI/InputControl'

import { useContext, useEffect } from 'react'
import NewPasswordSchema from '../validators/newPasswordSchema'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { ToastContext } from '../context/ToastContext'
import { newPassword } from '../api/userApi'

const initialValues: INewPassword = {
  password: '',
  confirmPassword: '',
}

export default function NewPassword() {
  const newPasswordMutation = useMutation(newPassword)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const toastContext = useContext(ToastContext)
  const handleSubmit = async (values: INewPassword) => {
    try {
      await newPasswordMutation.mutateAsync({
        ...values,
        token: searchParams.get('token')!,
      })

      toastContext?.addSuccessToast({
        message: 'Password changed successfully',
      })
      navigate('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        toastContext?.addErrorToast({ message: error.response?.data.message })
      }
    }
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
        />
        <button
          disabled={newPasswordMutation.isLoading}
          className="mt-3 btn btn-primary"
        >
          Create new password
        </button>
      </form>
    </div>
  )
}
