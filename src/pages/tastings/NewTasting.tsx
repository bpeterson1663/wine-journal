import { Container } from '@mui/material'
import { FormNewTasting } from '../../components/form-tasting/new-tasting.component'
import Footer from 'components/footer/footer.component'

const NewWine = () => {
  return (
    <Container component="main">
      <FormNewTasting />
      <Footer />
    </Container>
  )
}

export default NewWine
