import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth/useAuth.Context'
function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace></Navigate>
  return <Outlet />
}

export default ProtectedRoute
