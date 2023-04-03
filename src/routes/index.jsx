import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { SignIn } from '../pages/signIn'
import { SignUp } from '../pages/signUp'
import { Dashboard } from '../pages/dashboard'
import { ForgoPassword } from '../pages/forgotPassword'
import { ResetPassword } from '../pages/resetPassword'
import { AdminDashboard } from '../pages/adminDashboard'
import { UserProfile } from '../pages/userProfile'
import { ApplicationAbout } from '../pages/applicationAbout'

import { useAuth } from '../hooks/auth'
import { AdminEmailSettings } from '../pages/adminEmailSettings'
import { AdminUsersList } from '../pages/adminUsersList'
import { AdminCategories } from '../pages/adminCategories'
import { AdminTopics } from '../pages/adminTopics'
import { AdminTags } from '../pages/adminTags'
import { AdminQuestions } from '../pages/adminQuestions'

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
              <AdminDashboard />
            ) : (
              <Dashboard />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/user-profile"
        element={user ? <UserProfile /> : <Navigate to="/" />}
      />

      <Route
        path="/application-about"
        element={user ? <ApplicationAbout /> : <Navigate to="/" />}
      />

      <Route path="/forgot-password" element={<ForgoPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/email-settings"
        element={
          user && user.isAdmin ? <AdminEmailSettings /> : <Navigate to="/" />
        }
      />

      <Route
        path="/users"
        element={
          user && user.isAdmin ? <AdminUsersList /> : <Navigate to="/" />
        }
      />

      <Route
        path="/categories"
        element={
          user && user.isAdmin ? <AdminCategories /> : <Navigate to="/" />
        }
      />

      <Route
        path="/topcs"
        element={user && user.isAdmin ? <AdminTopics /> : <Navigate to="/" />}
      />

      <Route
        path="/tags"
        element={user && user.isAdmin ? <AdminTags /> : <Navigate to="/" />}
      />

      <Route
        path="/questions"
        element={
          user && user.isAdmin ? <AdminQuestions /> : <Navigate to="/" />
        }
      />

      <Route
        path="*"
        element={<Navigate to={`${user ? '/dashboard' : '/'}`} />}
      />
    </Routes>
  )
}

export default AppRoutes
