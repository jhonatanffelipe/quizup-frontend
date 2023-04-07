import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/auth'
import { SignIn } from '../pages/signIn'
import { SignUp } from '../pages/signUp'
import { ForgoPassword } from '../pages/forgotPassword'
import { ResetPassword } from '../pages/resetPassword'

import { Dashboard } from '../pages/dashboard'
import { UserProfile } from '../pages/userProfile'
import { ApplicationAbout } from '../pages/applicationAbout'

import { AdminDashboard } from '../pages/adminDashboard'
import { AdminEmailSettings } from '../pages/adminEmailSettings'
import { AdminUsersList } from '../pages/adminUsersList'
import { AdminUsers } from '../pages/adminUsers'
import { AdminCategoriesList } from '../pages/adminCategoriesList'
import { AdminSubject } from '../pages/adminSubject'
import { AdminTag } from '../pages/adminTag'
import { AdminTagsList } from '../pages/adminTagsList'
import { AdminQuestion } from '../pages/adminQuestion'
import { AdminCategory } from '../pages/adminCategory'
import { AdminSubjectsList } from '../pages/adminSubjectsList'
import { AdminQuestionsList } from '../pages/adminQuestionsList'

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
        path="/user/:id"
        element={user && user.isAdmin ? <AdminUsers /> : <Navigate to="/" />}
      />

      <Route
        path="/user"
        element={user && user.isAdmin ? <AdminUsers /> : <Navigate to="/" />}
      />

      <Route
        path="/categories"
        element={
          user && user.isAdmin ? <AdminCategoriesList /> : <Navigate to="/" />
        }
      />

      <Route
        path="/category/:id"
        element={user && user.isAdmin ? <AdminCategory /> : <Navigate to="/" />}
      />

      <Route
        path="/category"
        element={user && user.isAdmin ? <AdminCategory /> : <Navigate to="/" />}
      />

      <Route
        path="/subjects"
        element={
          user && user.isAdmin ? <AdminSubjectsList /> : <Navigate to="/" />
        }
      />

      <Route
        path="/subject/:id"
        element={user && user.isAdmin ? <AdminSubject /> : <Navigate to="/" />}
      />

      <Route
        path="/subject"
        element={user && user.isAdmin ? <AdminSubject /> : <Navigate to="/" />}
      />

      <Route
        path="/tags"
        element={user && user.isAdmin ? <AdminTagsList /> : <Navigate to="/" />}
      />

      <Route
        path="/tag/:id"
        element={user && user.isAdmin ? <AdminTag /> : <Navigate to="/" />}
      />

      <Route
        path="/tag"
        element={user && user.isAdmin ? <AdminTag /> : <Navigate to="/" />}
      />

      <Route
        path="/questions"
        element={
          user && user.isAdmin ? <AdminQuestionsList /> : <Navigate to="/" />
        }
      />

      <Route
        path="/question"
        element={user && user.isAdmin ? <AdminQuestion /> : <Navigate to="/" />}
      />

      <Route
        path="/question/:id"
        element={user && user.isAdmin ? <AdminQuestion /> : <Navigate to="/" />}
      />

      <Route
        path="*"
        element={<Navigate to={`${user ? '/dashboard' : '/'}`} />}
      />
    </Routes>
  )
}

export default AppRoutes
