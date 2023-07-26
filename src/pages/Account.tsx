import AppBar from '../UI/AppBar'
import useUser from '../hooks/useUser'
import { Outlet } from 'react-router-dom'

export default function Account() {
  const { data, isLoading } = useUser()

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
