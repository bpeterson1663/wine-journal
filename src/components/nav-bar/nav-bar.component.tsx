import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { logout } from '../../features/auth/authSlice'
const NavButton = styled(Button)(() => ({
  color: 'white',
}))

const Icon = styled(IconButton)(() => ({
  color: 'white',
}))

const NavLink = styled(Link)(() => ({
  textDecoration: 'none',
}))

const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)
  const { userProfile } = useAppSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(logout())
    if (!currentUser) {
      navigate('/')
    }
  }
  return (
    <AppBar position="static">
      <Toolbar>
        {currentUser && (
          <>
            <NavLink to="/wines">
              <Icon aria-label="home button">
                <span className="iconify" data-icon="emojione-monotone:wine-glass"></span>
              </Icon>
            </NavLink>
            <NavLink to="/varietals">
              <Icon aria-label="home button">
                <span className="iconify" data-icon="mdi:fruit-grapes"></span>
              </Icon>
            </NavLink>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row-reverse wrap',
                width: '90%',
                alignItems: 'center',
                margin: '0 10px',
              }}
            >
              <NavButton variant="text" onClick={handleLogout}>
                Sign Out
              </NavButton>
              {userProfile?.firstName && <span>Hello, {userProfile?.firstName}</span>}
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
