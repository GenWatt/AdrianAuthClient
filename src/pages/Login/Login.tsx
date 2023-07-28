import Header from '../../UI/Header'
import { useFormik } from 'formik'
import { InputControl } from '../../UI/InputControl'
import { ILoginUser } from '../../types'
import { useMutation } from 'react-query'
import { loginUser } from '../../api/userApi'
import { NavLink, useNavigate } from 'react-router-dom'
import useError from '../../hooks/useError'
import Button from '../../UI/Button'

const initalValues: ILoginUser = {
  identifier: '',
  password: '',
}

export default function Login() {
  const { handleError } = useError()

  const navigate = useNavigate()
  const loginMutation = useMutation(loginUser, {
    onError: handleError,
  })

  const submit = async (values: ILoginUser) => {
    await loginMutation.mutateAsync(values)
    navigate('/account/me')
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
        <Button isLoading={loginMutation.isLoading} type="submit">
          Login
        </Button>
      </form>
    </>
  )
}
