import { useContext } from 'react'
import Header from '../UI/Header'
import { useFormik } from 'formik'
import InputControl from '../UI/InputControl'
import { ILoginUser } from '../types'
import { useMutation } from 'react-query'
import { loginUser } from '../api/userApi'
import { ToastContext } from '../context/ToastContext'
import { AxiosError } from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const initalValues: ILoginUser = {
  identifier: '',
  password: '',
}

export default function Login() {
  const loginMutation = useMutation(loginUser)
  const toastContext = useContext(ToastContext)
  const navigate = useNavigate()

  const submit = async (values: ILoginUser) => {
    try {
      const response = await loginMutation.mutateAsync(values)
      console.log(response)
      navigate('/account')
    } catch (error) {
      if (error instanceof AxiosError) {
        toastContext?.addErrorToast(
          error.response?.data.message || 'Something went wrong'
        )
      }
    }
  }

  const loginForm = useFormik({
    initialValues: initalValues,
    onSubmit: submit,
  })

  return (
    <>
      <Header text="Login to - " headlineText="AdrianAuth" />

      <form className="container" onSubmit={loginForm.handleSubmit}>
        <InputControl
          label="Username or Email"
          name="identifier"
          type="text"
          placeholder="Enter your username or email"
          id="identifier"
          onChange={loginForm.handleChange}
          value={loginForm.values.identifier}
          errorMessage={loginForm.errors.identifier}
        />
        <InputControl
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
          errorMessage={loginForm.errors.password}
        />
        <div className="mb-3 mt-3">
          <NavLink to="/register">Don't have an account? Register now!</NavLink>
        </div>

        <div className="mb-3">
          <NavLink to="/reset-password">Forgot your password?</NavLink>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  )
}
