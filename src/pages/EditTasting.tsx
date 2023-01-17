import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EditTastingForm } from '../components/form-tasting/edit-tasting.component'
import { useAppSelector } from '../features/hooks'

const EditTasting = () => {
  const { editTasting } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()
  if (!editTasting) {
    navigate('/tastings')
  }
  return (
    <Container>
      <EditTastingForm editTasting={editTasting} />
    </Container>
  )
}

export default EditTasting
