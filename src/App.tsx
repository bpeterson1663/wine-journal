import { grey, red } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from 'components/layout/layout.component'
import { authSuccess } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchUserStart } from 'features/user/userSlice'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import EditTasting from 'pages/EditTasting'
import NewTasting from 'pages/NewTasting'
import SignInUp from 'pages/SignInUp'
import TastingId from 'pages/tastings/tasting-id'
import Tastings from 'pages/tastings/tastings'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

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
            <Route index element={<SignInUp />} />
            <Route
              path="/tastings"
              element={
                <RequireAuth>
                  <Tastings />
                </RequireAuth>
              }
            />
            <Route
              path="/tastings/:id"
              element={
                <RequireAuth>
                  <TastingId />
                </RequireAuth>
              }
            />
            <Route
              path="/new-tasting"
              element={
                <RequireAuth>
                  <NewTasting />
                </RequireAuth>
              }
            />
            <Route
              path="/edit-tasting"
              element={
                <RequireAuth>
                  <EditTasting />
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
