import { NavLink, useNavigate } from 'react-router-dom'
import {
  BrightnessHighFill,
  MoonFill,
  PersonCircle,
} from 'react-bootstrap-icons'
import Loader from './Loader'
import { IUser } from '../types'
import { ToastContext } from '../context/ToastContext'
import { useContext, useState } from 'react'
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
  const [isDarkMode, setIsDarkMode] = useState(false)
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

  const handleThemeChange = () => {
    setIsDarkMode((prev) => !prev)
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }

  return (
    <nav className="navbar bg-primary w-100" style={{ left: 0 }}>
      <div className="d-flex justify-content-between w-100 p-3 align-items-center">
        <NavLink to="/account" className="navbar-brand text-light fw-bold fs-3">
          {appName}
        </NavLink>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="d-flex align-items-center text-white gap-2">
            <div className="text-light" onClick={handleThemeChange}>
              {isDarkMode ? (
                <BrightnessHighFill size={24} />
              ) : (
                <MoonFill size={24} />
              )}
            </div>
            <NavLink to="/me" className="text-light d-flex align-items-center">
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
