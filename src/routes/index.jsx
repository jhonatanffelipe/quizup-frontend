import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { SignIn } from '../pages/signIn'
import { SignUp } from '../pages/signUp'
import { Dashboard } from '../pages/dashboard'
import { ForgoPassword } from '../pages/forgotPassword'
import { ResetPassword } from '../pages/resetPassword'
import { DashboardAdmin } from '../pages/dashboardAdmin'
import { UserProfile } from '../pages/userProfile'
import { ApplicationAbout } from '../pages/applicationAbout'

import { useAuth } from '../hooks/auth'
import { EmailSettings } from '../pages/emailSettings'
import { UserSettings } from '../pages/userSettings'
import { Categories } from '../pages/categories'
import { Topics } from '../pages/topics'
import { Tags } from '../pages/tags'

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

      <Route
        path="/user_profile"
        element={user ? <UserProfile /> : <Navigate to="/" />}
      />

      <Route
        path="/application_about"
        element={user ? <ApplicationAbout /> : <Navigate to="/" />}
      />

      <Route path="/forgot_password" element={<ForgoPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />

      <Route
        path="/email_settings"
        element={user && user.isAdmin ? <EmailSettings /> : <Navigate to="/" />}
      />

      <Route
        path="/users_settings"
        element={user && user.isAdmin ? <UserSettings /> : <Navigate to="/" />}
      />

      <Route
        path="/categories"
        element={user && user.isAdmin ? <Categories /> : <Navigate to="/" />}
      />

      <Route
        path="/topcs"
        element={user && user.isAdmin ? <Topics /> : <Navigate to="/" />}
      />

      <Route
        path="/tags"
        element={user && user.isAdmin ? <Tags /> : <Navigate to="/" />}
      />

      <Route
        path="*"
        element={<Navigate to={`${user ? '/dashboard' : '/'}`} />}
      />
    </Routes>
  )
}

export default AppRoutes
