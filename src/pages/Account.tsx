import { useEffect } from 'react'
import AppBar from '../UI/AppBar'
import useUser from '../hooks/useUser'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Account() {
  const { data, isLoading } = useUser()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/account') {
      navigate('/account/me')
    }
  }, [])

  return (
    <>
      <AppBar
        appName={import.meta.env.VITE_APP_NAME}
        user={data?.user}
        isLoading={isLoading}
      />
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
