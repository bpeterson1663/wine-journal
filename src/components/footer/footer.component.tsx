import { AppBar, Toolbar } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const Footer = ({ children }: Props) => {
  return (
    <AppBar component="footer" position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  )
}

export default Footer
