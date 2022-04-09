import React from 'react'
import { Container, Typography, Box, Skeleton } from '@mui/material'
import SignUpForm from '../components/sign-up-form/sign-up-form.component'
import SignInForm from '../components/sign-in-form/sign-in-form.component'
import { useAppSelector } from '../features/hooks'

const Home = () => {
  const { currentUser, status } = useAppSelector((state) => state.auth)
  return (
    <Container component="main">
      {(status === 'loading' || status === 'idle') && !currentUser?.uid ? (
        <Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />
      ) : (
        <>
          <Typography variant="h1" component="header">
            Home
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
              <Typography variant="h2" component="header">
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
              <Typography variant="h2" component="header">
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

export default Home
