import Header from '../../UI/Header'
import { useFormik } from 'formik'
import { InputControl } from '../../UI/InputControl'
import { ILoginUser } from '../../types'
import { useMutation } from 'react-query'
import { loginUser } from '../../api/userApi'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import useError from '../../hooks/useError'
import Button from '../../UI/Button'

const initalValues: ILoginUser = {
  identifier: '',
  password: '',
  callbackUrl: '',
}

export default function Login() {
  const { handleError } = useError()
  const [searchParams] = useSearchParams()
  const brandName = searchParams.get('brand')
    ? searchParams.get('brand')
    : import.meta.env.VITE_APP_NAME
  initalValues.callbackUrl = searchParams.get('callbackUrl') || ''

  const navigate = useNavigate()
  const loginMutation = useMutation(loginUser, {
    onError: handleError,
  })

  const submit = async (values: ILoginUser) => {
    await loginMutation.mutateAsync(values)
    if (values.callbackUrl) {
      window.location.href = values.callbackUrl
      return
    }

    navigate('/account/me')
  }

  const loginForm = useFormik({
    initialValues: initalValues,
    onSubmit: submit,
  })

  return (
    <>
      <Header text="Login to - " headlineText={brandName} />

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
        <input
          type="hidden"
          name="callbackUrl"
          id="callbackUrl"
          value={loginForm.values.callbackUrl}
          onChange={loginForm.handleChange}
        />
        <div className="mb-3 mt-3">
          <NavLink to="/register">Don't have an account? Register now!</NavLink>
        </div>

        <div className="mb-3">
          <NavLink to="/reset-password">Forgot your password?</NavLink>
        </div>
        <Button isLoading={loginMutation.isLoading} type="submit">
          Login
        </Button>
      </form>
    </>
  )
}
