import React from 'react'
import { Container, Typography } from '@mui/material'
import FormNewWine from '../components/form-new-wine/form-new-wine.component'
const NewWine = () => (
  <Container component="main">
    <Typography component="header">New Wine</Typography>
    <FormNewWine />
  </Container>
)

export default NewWine
