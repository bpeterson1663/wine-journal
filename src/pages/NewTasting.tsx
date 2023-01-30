import { Container } from '@mui/material'
import { FormNewTasting } from '../components/form-tasting/new-tasting.component'
import { useAppSelector } from '../features/hooks'

const NewWine = () => {
  const { tastingOpen } = useAppSelector((state) => state.tasting)
  return (
    <Container component="main">
      <FormNewTasting tastingOpen={tastingOpen} />
    </Container>
  )
}

export default NewWine
