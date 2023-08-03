import { Container } from '@mui/material'
import Footer from 'components/footer/footer.component'
import { FormNewTasting } from '../../components/form-tasting/new-tasting.component'

const NewWine = () => {
  return (
    <>
      <Container component="main">
        <FormNewTasting />
      </Container>
      <Footer />
    </>
  )
}

export default NewWine
