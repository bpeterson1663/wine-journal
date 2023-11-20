import { Outlet } from 'react-router-dom'
import NavBar from 'components/nav-bar/nav-bar.component'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout
