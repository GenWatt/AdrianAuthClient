import { NavLink, useNavigate } from 'react-router-dom'
import { PersonCircle } from 'react-bootstrap-icons'
import Loader from './Loader'
import { IUser } from '../types'
import { ToastContext } from '../context/ToastContext'
import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { logoutUser } from '../api/userApi'
import useError from '../hooks/useError'
import Button from './Button'

import Text from './Text'
import ThemePicker from '../components/ThemePicker'

interface AppBarProps {
  appName: string
  user?: IUser
  isLoading: boolean
}

export default function AppBar({ isLoading, appName, user }: AppBarProps) {
  const toastContext = useContext(ToastContext)
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const { handleError } = useError()

  const logoutMutation = useMutation(logoutUser, { onError: handleError })

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    toastContext?.addSuccessToast({
      message: 'Logged out successfully',
    })
    await queryClient.removeQueries('user')
    navigate('/login')
  }

  return (
    <nav className="navbar bg-primary w-100">
      <div className="d-flex justify-content-between w-100 p-3 align-items-center">
        <NavLink
          to="/account/me"
          className="navbar-brand text-light fw-bold fs-3"
        >
          {appName}
        </NavLink>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="d-flex align-items-center text-white gap-2">
            <ThemePicker />
            <NavLink to="/me" className="text-light d-flex align-items-center">
              <PersonCircle className="fs-1" />
              {user && <Text className="pe-2 ps-2 fs-4">{user.username}</Text>}
            </NavLink>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
