import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks/hooks'

export default function PrivateRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
