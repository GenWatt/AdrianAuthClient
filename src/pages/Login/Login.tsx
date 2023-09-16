import Header from '../../UI/Header'
import { useFormik } from 'formik'
import { InputControl } from '../../UI/InputControl'
import { ILoginUser } from '../../types'
import { useMutation, useQueryClient } from 'react-query'
import { loginUser } from '../../api/userApi'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import useError from '../../hooks/useError'
import Button from '../../UI/Button'
import { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../context/ToastContext'
import useUser from '../../hooks/useUser'

const initalValues: ILoginUser = {
  identifier: '',
  password: '',
  callbackUrl: '',
}

let isRedirecting = false

export default function Login() {
  const { handleError } = useError()
  const [searchParams] = useSearchParams()
  const brandName = searchParams.get('brand')
    ? searchParams.get('brand')
    : import.meta.env.VITE_APP_NAME
  initalValues.callbackUrl = searchParams.get('callbackUrl') || ''
  const toastContext = useContext(ToastContext)

  const navigate = useNavigate()
  const loginMutation = useMutation(loginUser, {
    onError: handleError,
  })
  const userData = useUser(false)
  const queryClient  = useQueryClient()

  const submit = async (values: ILoginUser) => {
    await loginMutation.mutateAsync(values)
    queryClient.invalidateQueries('user')

    if(redirectToCallback()) return
    navigate('/account/me')
  }

  const loginForm = useFormik({
    initialValues: initalValues,
    onSubmit: submit,
  })

  const redirectToCallback = (): boolean => {
    if (initalValues.callbackUrl && !isRedirecting) {
      isRedirecting = true
      toastContext?.addSuccessToast({
        message: `Login successful, redirecting to ${brandName}`,
      })
      window.location.href = initalValues.callbackUrl
      return true
    }
    return false
  }

  useEffect(() => {
    if (userData.data?.user) {
      if (redirectToCallback()) return
      navigate('/account/me')
    }

    return () => {
      isRedirecting = false
    }
  }, [userData.data?.user])

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
