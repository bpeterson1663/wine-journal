
import React, { useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import { getWines } from '../api'

const Wines = () => {
  const getAllWines = async () => {
    const response = await getWines()
    console.log('response: ', response)
  }
  useEffect(() => {
    getAllWines()
  }, [])
  return (
    <Container component="main">
      <Typography component="header">Wines</Typography>
    </Container>
  )
}

export default Wines
