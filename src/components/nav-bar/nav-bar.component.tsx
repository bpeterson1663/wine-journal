import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useAppSelector } from '../../features/hooks'

const NavButton = styled(Button)(() => ({
  color: 'white',
}))

const NavLink = styled(Link)(() => ({
  textDecoration: 'none',
}))

const NavBar = () => {
  const { currentUser } = useAppSelector((state) => state.auth)

  return (
    <AppBar position="static">
      <Toolbar>
        {currentUser && (
          <>
            <NavLink to="/">
              <NavButton variant="text">Home</NavButton>
            </NavLink>
            <NavLink to="/wines">
              <NavButton variant="text">Wines</NavButton>
            </NavLink>
            <NavLink to="/new">
              <NavButton variant="text">New Wine</NavButton>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
