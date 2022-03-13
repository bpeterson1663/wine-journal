import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from './pages/Home'
import NewWine from './pages/NewWine'
import Wines from './pages/Wines'
import ViewWine from './pages/ViewWine'
import Layout from './components/layout/layout.component'
import { useAppDispatch } from './features/hooks'
import { authSuccess } from './features/auth/authSlice'

function App() {
  const auth = getAuth()
  const dispatch = useAppDispatch()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, uid } = user
      if (email && uid) {
        dispatch(authSuccess({ email, uid }))
      }
    }
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="wines" element={<Wines />} />
          <Route path="new" element={<NewWine />} />
          <Route path="wine/:id" element={<ViewWine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
