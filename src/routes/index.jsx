import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import SignIn from '../pages/signIn'
import SignUp from '../pages/signUp'
import Dashboard from '../pages/dashboard'
import ForgoPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import { useAuth } from '../hooks/auth'
import DashboardAdmin from '../pages/dashboardAdmin'

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <SignIn /> : <Navigate to="/dashboard" />}
      />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          user ? (
            user.isAdmin ? (
              <DashboardAdmin />
            ) : (
              <Dashboard />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="/forgot_password" element={<ForgoPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />

      <Route
        path="*"
        element={<Navigate to={`${user ? '/dashboard' : '/'}`} />}
      />
    </Routes>
  )
}

export default AppRoutes
