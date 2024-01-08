import { ReactNode, useContext } from 'react'
import Layout from 'components/layout/layout.component'
import NotFound from 'pages/NotFound'
import EditTasting from 'pages/tastings/EditTasting'
import NewTasting from 'pages/tastings/NewTasting'
import ViewTasting from 'pages/tastings/ViewTasting'
import { Cellar, ViewWine, NewWine, EditWine } from 'pages/cellar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignInUp from 'pages/SignInUp'
import Tastings from 'pages/tastings/Tastings'
import { Profile } from 'pages/profile'
import { UserContext } from 'context/user.context'

function App () {
  // Original theme
  //   palette: {
  //     primary: {
  //       main: '#424242'
  //     },
  //     secondary: {
  //       main: '#b71c1c'
  //     },
  //     info: {
  //       main: '#ffffff'
  //     }
  //   },

  const ProtectedRoute = ({ component }: { component: ReactNode }) => {
    const { currentUser, loading } = useContext(UserContext)

    if (loading) {
      return <div>Loading....</div>
    }
    if (!currentUser?.uid) {
      return <Navigate to="/login" replace />
    }

    return component
  }

  return (
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

        <Route path="/cellar">
          <Route index element={ <ProtectedRoute component={ <Cellar /> } /> } />
          <Route path=":id" element={ <ProtectedRoute component={ <ViewWine /> } /> } />
          <Route path="new" element={ <ProtectedRoute component={ <NewWine /> } /> } />
          <Route path="edit" element={ <ProtectedRoute component={ <EditWine /> } /> } />
        </Route>

        <Route path="/profile">
          <Route index element={ <ProtectedRoute component={ <Profile /> } /> } />
        </Route>

        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  )
}

export default App
