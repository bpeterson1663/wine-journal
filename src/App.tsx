import { grey, red } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from 'components/layout/layout.component'
import { useAppSelector } from 'features/hooks'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import EditTasting from 'pages/tastings/EditTasting'
import NewTasting from 'pages/tastings/NewTasting'
import ViewTasting from 'pages/tastings/ViewTasting'
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
            path="/tastings/:id"
            element={
              <AuthRoute>
                <ViewTasting />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
