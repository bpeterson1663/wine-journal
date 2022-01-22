import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NewWine from './pages/NewWine'
import Wines from './pages/Wines'
import Layout from './components/layout/layout.component'
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="wines" element={<Wines />} />
            <Route path="new" element={<NewWine />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
