import { useContext } from 'react'
import Header from '../UI/Header'
import InputControl from '../UI/InputControl/InputControl'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { resetPassword } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { AxiosError } from 'axios'
import useError from '../hooks/useError'
import Button from '../UI/Button'

const initialValues = {
  email: '',
}

export default function ResetPassword() {
  const { handleError } = useError()
  const resetPasswordMutation = useMutation<string, AxiosError, string>(
    resetPassword,
    { onError: handleError }
  )
  const toastContext = useContext(ToastContext)

  const handleSubmit = async (values: typeof initialValues) => {
    await resetPasswordMutation.mutateAsync(values.email)

    toastContext?.addSuccessToast({
      message: 'Check your email for a reset link',
    })
  }

  const resetPasswordForm = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Header text="Reset your password" />
      <form className="container" onSubmit={resetPasswordForm.handleSubmit}>
        <InputControl
          label="E-mail"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={resetPasswordForm.values.email}
          onChange={resetPasswordForm.handleChange}
          className="mb-3"
        />
        <Button isLoading={resetPasswordMutation.isLoading}>
          Reset Password
        </Button>
      </form>
    </>
  )
}
