import { useContext } from 'react'
import Header from '../UI/Header'
import InputControl from '../UI/InputControl'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { resetPassword } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { AxiosError } from 'axios'

const initialValues = {
  email: '',
}

export default function ResetPassword() {
  const resetPasswordMutation = useMutation<string, AxiosError, string>(
    resetPassword
  )
  const toastContext = useContext(ToastContext)

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await resetPasswordMutation.mutateAsync(values.email)

      toastContext?.addSuccessToast('Check your email for a reset link')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        toastContext?.addErrorToast(error.response?.data.message)
    }
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
        />
        <button
          disabled={resetPasswordMutation.isLoading}
          className="mt-3 btn btn-primary"
        >
          Reset Password
        </button>
      </form>
    </>
  )
}
