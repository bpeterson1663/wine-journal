import { grey, red } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from 'components/layout/layout.component'
import { useAppSelector } from 'features/hooks'
import EditTasting from 'pages/EditTasting'
import Home from 'pages/Home'
import NewTasting from 'pages/NewTasting'
import TastingId from 'pages/tastings/tasting-id'
import Tastings from 'pages/tastings/tastings'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

function App() {
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

  const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAppSelector((state) => state.auth)
    let location = useLocation()

    if (!currentUser?.uid) {
      return <Navigate to="/" state={{ from: location }} replace />
    }
    return children
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/tastings"
            element={
              <AuthRoute>
                <Tastings />
              </AuthRoute>
            }
          />
          <Route
            path="/tastings/:id"
            element={
              <AuthRoute>
                <TastingId />
              </AuthRoute>
            }
          />
          <Route
            path="/new-tasting"
            element={
              <AuthRoute>
                <NewTasting />
              </AuthRoute>
            }
          />
          <Route
            path="/edit-tasting"
            element={
              <AuthRoute>
                <EditTasting />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
