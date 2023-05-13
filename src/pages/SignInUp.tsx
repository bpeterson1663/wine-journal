import { Box, Container, Skeleton, Typography } from '@mui/material'
import SignInForm from '../components/sign-in-form/sign-in-form.component'
import SignUpForm from '../components/sign-up-form/sign-up-form.component'
import { useAppSelector } from '../features/hooks'

const SignInUp = () => {
  const { currentUser, status } = useAppSelector((state) => state.auth)
  return (
    <Container component="main">
      {status === 'loading' && !currentUser?.uid ? (
        <Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />
      ) : (
        <>
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
        </>
      )}
    </Container>
  )
}

export default SignInUp
