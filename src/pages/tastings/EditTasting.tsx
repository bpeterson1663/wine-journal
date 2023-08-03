import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EditTastingForm } from '../../components/form-tasting/edit-tasting.component'
import { useAppSelector } from '../../features/hooks'
import Footer from 'components/footer/footer.component'

const EditTasting = () => {
  const { editTasting } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()
  if (!editTasting) {
    navigate('/')
  }
  return (
    <Container>
      <EditTastingForm editTasting={editTasting} />
      <Footer />
    </Container>
  )
}

export default EditTasting
