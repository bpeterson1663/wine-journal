import { AppBar, Toolbar } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const Footer = ({ children }: Props) => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  )
}

export default Footer
