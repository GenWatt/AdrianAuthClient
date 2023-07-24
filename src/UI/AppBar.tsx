import { NavLink } from 'react-router-dom'
import { PersonCircle } from 'react-bootstrap-icons'
import Loader from './Loader'
import { IUser } from '../types'

interface AppBarProps {
  appName: string
  user?: IUser
  isLoading: boolean
}

export default function AppBar({ isLoading, appName, user }: AppBarProps) {
  return (
    <nav className="navbar bg-primary w-100" style={{ left: 0 }}>
      <div className="d-flex justify-content-between w-100 p-3 align-items-center">
        <NavLink to="/account" className="navbar-brand text-white fw-bold fs-3">
          {appName}
        </NavLink>

        {isLoading ? (
          <Loader />
        ) : (
          <NavLink to="/me" className="text-white d-flex align-items-center">
            {user && <p className="pe-2 fs-4">{user.username}</p>}
            <PersonCircle className="text-white fs-1" />
          </NavLink>
        )}
      </div>
    </nav>
  )
}
