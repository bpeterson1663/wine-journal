import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar } from '@material-ui/core'

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/wines">
        <Button>Wines</Button>
      </Link>
      <Link to="/new">
        <Button>New Wine</Button>
      </Link>
    </Toolbar>
  </AppBar>
)

export default NavBar
