import { Navigate, RouteObject } from 'react-router-dom'
import Account from './pages/Account'
import ConfirmEmail from './pages/ConfirmEmail'
import Login from './pages/Login/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import NewPassword from './pages/NewPassword'
import Me from './pages/Me'

const routes: RouteObject[] = [
  {
    path: '/account',
    element: <Account />,
    children: [
      {
        path: '/account/me',
        element: <Me />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: '/',
    element: <Navigate to="/account" />,
  },
  {
    path: '*',
    element: <Navigate to="/account" />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/new-password',
    element: <NewPassword />,
  },
]

export default routes
