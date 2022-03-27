import React from 'react'
import { Container } from '@mui/material'
import { useAppSelector } from '../features/hooks'
import EditWineForm from '../components/form-wine/form-edit-wine.component'
import { useNavigate } from 'react-router-dom'

const EditWine = () => {
  const { editWine } = useAppSelector((state) => state.wine)
  const navigate = useNavigate()
  if (!editWine) {
    navigate('/wines')
  }
  return (
    <Container>
      <EditWineForm editWine={editWine} />
    </Container>
  )
}

export default EditWine
