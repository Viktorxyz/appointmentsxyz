import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function ProtectedRoutes() {
  const { currentUser } = useAuth()

  if (currentUser) {
    return <Outlet />
  } else {
    return <Navigate to={'sign-up'} />
  }
}

export default ProtectedRoutes