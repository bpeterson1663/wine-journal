import { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import Footer from 'components/footer/footer.component'
import SignInForm from '../components/sign-in-form/sign-in-form.component'
import SignUpForm from '../components/sign-up-form/sign-up-form.component'
import styles from 'pages/styles/pages.module.css'

const SignInUp = () => {
  const [showSignIn, setShowSignIn] = useState(true)

  return (
    <Container component="main">
      <Typography variant="h1" component="header" style={ { fontSize: '2rem' } }>
        Wine Journal
      </Typography>
      <Container
        sx={ {
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center'
        } }
      >
        { showSignIn
          ? <Box
              sx={ {
                display: 'flex',
                flexDirection: 'column',
                width: 500
              } }>
              <Typography variant="h2" component="header" style={ { fontSize: '1.5rem' } }>
                Sign In
              </Typography>
              <SignInForm />
              <div className={ styles['action-container'] }>
                Dont have an account yet?&nbsp;<span className={ styles['click-here'] } onClick={ () => { setShowSignIn(false) } }> Click Here</span>
              </div>
            </Box>
          : <Box
              sx={ {
                display: 'flex',
                flexDirection: 'column',
                width: 500
              } }>
              <Typography variant="h2" component="header" style={ { fontSize: '1.5rem' } }>
                Sign Up
              </Typography>
              <SignUpForm />
              <div className={ styles['action-container'] }>
                Already have an account yet?&nbsp;<span className={ styles['click-here'] } onClick={ () => { setShowSignIn(true) } }> Click Here</span>
              </div>
            </Box>
        }
      </Container>
      <Footer />
    </Container>
  )
}

export default SignInUp
