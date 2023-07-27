import { NavLink, useNavigate } from 'react-router-dom'
import { PersonCircle } from 'react-bootstrap-icons'
import Loader from './Loader'
import { IUser } from '../types'
import { ToastContext } from '../context/ToastContext'
import { useContext } from 'react'
import { useMutation } from 'react-query'
import { logoutUser } from '../api/userApi'
import useError from '../hooks/useError'
import Button from './Button'

interface AppBarProps {
  appName: string
  user?: IUser
  isLoading: boolean
}

export default function AppBar({ isLoading, appName, user }: AppBarProps) {
  const toastContext = useContext(ToastContext)
  const navigate = useNavigate()
  const { handleError } = useError()

  const logoutMutation = useMutation(logoutUser, { onError: handleError })

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    toastContext?.addSuccessToast({
      message: 'Logged out successfully',
    })
    navigate('/login')
  }

  return (
    <nav className="navbar bg-primary w-100" style={{ left: 0 }}>
      <div className="d-flex justify-content-between w-100 p-3 align-items-center">
        <NavLink to="/account" className="navbar-brand text-white fw-bold fs-3">
          {appName}
        </NavLink>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="d-flex align-items-center text-white gap-2">
            <NavLink to="/me" className="text-white d-flex align-items-center">
              {user && <p className="pe-2 fs-4">{user.username}</p>}
              <PersonCircle className="fs-1" />
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
