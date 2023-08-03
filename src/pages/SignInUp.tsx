import { Box, Container, Typography } from '@mui/material'
import Footer from 'components/footer/footer.component'
import SignInForm from '../components/sign-in-form/sign-in-form.component'
import SignUpForm from '../components/sign-up-form/sign-up-form.component'

const SignInUp = () => {
  return (
    <Container component="main">
      <Typography variant="h1" component="header" style={{ fontSize: '2rem' }}>
        Wine Journal
      </Typography>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 500,
          }}
        >
          <Typography variant="h2" component="header" style={{ fontSize: '1.5rem' }}>
            Sign Up
          </Typography>
          <SignUpForm />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 500,
          }}
        >
          <Typography variant="h2" component="header" style={{ fontSize: '1.5rem' }}>
            Sign In
          </Typography>
          <SignInForm />
        </Box>
      </Container>
      <Footer />
    </Container>
  )
}

export default SignInUp
