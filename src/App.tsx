import { grey, red } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from 'components/layout/layout.component'
import { authSuccess } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchUserStart } from 'features/user/userSlice'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Cellar from 'pages/cellar/cellar'
import CellarId from 'pages/cellar/cellar-id'
import EditTasting from 'pages/EditTasting'
import EditWine from 'pages/EditWine'
import NewTasting from 'pages/NewTasting'
import NewVarietal from 'pages/NewVarietal'
import NewWine from 'pages/NewWine'
import SignInUp from 'pages/SignInUp'
import Tastings from 'pages/tastings/tastings'
import Varietals from 'pages/Varietals'
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
              path="/cellar"
              element={
                <RequireAuth>
                  <Cellar />
                </RequireAuth>
              }
            />
            <Route
              path="/cellar/:id"
              element={
                <RequireAuth>
                  <CellarId />
                </RequireAuth>
              }
            />
            <Route
              path="/new-wine"
              element={
                <RequireAuth>
                  <NewWine />
                </RequireAuth>
              }
            />
            <Route
              path="/edit-wine"
              element={
                <RequireAuth>
                  <EditWine />
                </RequireAuth>
              }
            />
            <Route
              path="/tastings"
              element={
                <RequireAuth>
                  <Tastings />
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
