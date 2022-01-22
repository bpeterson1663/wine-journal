import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../nav-bar/nav-bar.component'

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
)

export default Layout
