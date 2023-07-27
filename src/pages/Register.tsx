import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import InputControl from '../UI/InputControl'
import RegisterSchema from '../validators/registerSchema'
import { registerUser } from '../api'
import { useMutation } from 'react-query'
import { IApiResponse, IRegisterUser } from '../types'
import Header from '../UI/Header'
import { AxiosError } from 'axios'
import useError from '../hooks/useError'
import Button from '../UI/Button'

const initialValues: IRegisterUser = {
  username: '',
  email: '',
  password: '',
}

function Register() {
  const navigate = useNavigate()
  const { handleError } = useError()
  const register = useMutation<IRegisterUser, AxiosError<IApiResponse>, any>(
    registerUser,
    { onError: handleError }
  )

  const submit = async (values: IRegisterUser) => {
    await register.mutateAsync(values)
    navigate('/confirm-email?email=' + values.email, { replace: true })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: submit,
  })

  return (
    <>
      <Header
        text="Register to - "
        headlineText="AdrianAuth"
        headlineClassName="font-weight-ligh"
      />
      <form className="container" onSubmit={formik.handleSubmit}>
        <InputControl
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          id="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          errorMessage={formik.errors.username}
        />
        <InputControl
          label="Email"
          name="email"
          type="text"
          placeholder="Enter your email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          errorMessage={formik.errors.email}
        />
        <InputControl
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          errorMessage={formik.errors.password}
        />
        <div className="mt-3">
          <NavLink to="/login">Already have an account? Login</NavLink>
        </div>
        <div className="mt-3">
          <Button type="submit" isLoading={register.isLoading}>
            Register
          </Button>
        </div>
      </form>
    </>
  )
}

export default Register
