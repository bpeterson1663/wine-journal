import { Container } from '@mui/material'
import Footer from 'components/footer/footer.component'
import { useNavigate } from 'react-router-dom'
import { EditTastingForm } from '../../components/form-tasting/edit-tasting.component'
import { useAppSelector } from '../../features/hooks'

const EditTasting = () => {
  const { editTasting } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()
  if (!editTasting) {
    navigate('/')
  }
  return (
    <>
      <Container component="main">
        <EditTastingForm editTasting={editTasting} />
      </Container>
      <Footer />
    </>
  )
}

export default EditTasting
