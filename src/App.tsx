import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey, red } from '@mui/material/colors'
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from './pages/Home'
import NewWine from './pages/NewWine'
import Wines from './pages/Wines'
import Varietals from './pages/Varietals'
import EditWine from './pages/EditWine'
import NewVarietal from './pages/NewVarietal'
import Layout from './components/layout/layout.component'
import { useAppDispatch, useAppSelector } from './features/hooks'
import { authSuccess } from './features/auth/authSlice'
import { fetchUserStart } from './features/user/userSlice'

function App() {
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const { userProfile } = useAppSelector((state) => state.user)
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: red[900],
      },
    },
    typography: {
      fontFamily: 'Lexend Deca',
    },
  })
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, uid } = user
      if (email && uid) {
        dispatch(authSuccess({ email, uid }))
        if (!userProfile?.firstName) {
          dispatch(fetchUserStart(uid))
        }
      }
    }
  })

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAppSelector((state) => state.auth)
    let location = useLocation()

    if (!currentUser?.uid) {
      return <Navigate to="/" state={{ from: location }} replace />
    }
    return children
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/wines"
              element={
                <RequireAuth>
                  <Wines />
                </RequireAuth>
              }
            />
            <Route
              path="/new"
              element={
                <RequireAuth>
                  <NewWine />
                </RequireAuth>
              }
            />
            <Route
              path="/edit"
              element={
                <RequireAuth>
                  <EditWine />
                </RequireAuth>
              }
            />
            <Route
              path="/varietals"
              element={
                <RequireAuth>
                  <Varietals />
                </RequireAuth>
              }
            />
            <Route
              path="/new-varietal"
              element={
                <RequireAuth>
                  <NewVarietal />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
