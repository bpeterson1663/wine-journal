import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { ReactNode, useState } from 'react'
import Layout from 'components/layout/layout.component'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import NotFound from 'pages/NotFound'
import EditTasting from 'pages/tastings/EditTasting'
import NewTasting from 'pages/tastings/NewTasting'
import ViewTasting from 'pages/tastings/ViewTasting'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import SignInUp from 'pages/SignInUp'
import Tastings from 'pages/tastings/Tastings'
import { authSuccess } from 'features/auth/authSlice'
import { fetchUserStart } from 'features/user/userSlice'

function App () {
  const dispatch = useAppDispatch()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#424242'
      },
      secondary: {
        main: '#b71c1c'
      },
      info: {
        main: '#ffffff'
      }
    },
    typography: {
      fontFamily: 'Lexend Deca'
    }
  })

  const ProtectedRoute = ({ component }: { component: ReactNode }) => {
    const auth = getAuth()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { userProfile } = useAppSelector(state => state.user)

    onAuthStateChanged(auth, user => {
      if (user) {
        const { email, uid } = user
        if (email && uid) {
          dispatch(authSuccess({ email, uid }))
          setUser(user)
          setLoading(false)
          if (!userProfile?.firstName) {
            dispatch(fetchUserStart(uid))
          }
        }
      } else {
        setLoading(false)
        setUser(null)
      }
    })

    if (loading) {
      return <div>Loading....</div>
    }
    if (!user) {
      return <Navigate to="/login" replace />
    }

    return component
  }

  return (
    <ThemeProvider theme={ theme }>
      <Routes>
        <Route path="/" element={ <Layout /> } >
          <Route path="/login" element={ <SignInUp /> } />
          <Route index element={ <ProtectedRoute component={ <Tastings /> } /> } />

          <Route path="/tastings">
            <Route index element={ <ProtectedRoute component={ <Tastings /> } /> } />
            <Route path=":id" element={ <ProtectedRoute component={ <ViewTasting /> } /> } />
            <Route path="new" element={ <ProtectedRoute component={ <NewTasting /> } /> } />
            <Route path="edit" element={ <ProtectedRoute component={ <EditTasting /> } /> } />
          </Route>

          <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
