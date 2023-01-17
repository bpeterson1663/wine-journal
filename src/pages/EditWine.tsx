import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EditWineForm } from '../components/form-wine/edit-wine.component'
import { useAppSelector } from '../features/hooks'

const EditWine = () => {
  const { editWine } = useAppSelector((state) => state.wine)
  const navigate = useNavigate()
  if (!editWine) {
    navigate('/cellar')
  }
  return (
    <Container>
      <EditWineForm editWine={editWine} />
    </Container>
  )
}

export default EditWine
