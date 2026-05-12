import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getToken } from '../../services/auth'

export function RequireAdminAuth() {
  const location = useLocation()
  const token = getToken()

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
