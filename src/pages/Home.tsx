import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import SignUpForm from '../components/sign-up-form/sign-up-form.component'
import SignInForm from '../components/sign-in-form/sign-in-form.component'

const Home = () => (
  <Container component="main">
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
  </Container>
)

export default Home
