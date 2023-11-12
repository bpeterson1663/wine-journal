import { Box, Button, Group } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import PageContainer from 'components/page-container/page-container.component'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorSmell, DetailsTasting, Review, Taste } from 'components/form-steps'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import { fetchTastingEditStart } from 'features/tasting/tastingSlice'
import styles from 'pages/tastings/tastings.module.css'
import { TastingFormProvider, useTastingForm } from 'pages/tastings/form-context'
import { TastingSchema, TastingT } from 'schemas/tastings'
import Footer from 'components/footer/footer.component'

const EditTasting = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { editTasting } = useAppSelector(state => state.tasting)

  const form = useTastingForm({
    validate: zodResolver(TastingSchema)
  })

  useEffect(() => {
    if (!editTasting) {
      navigate('/')
    }
  }, [editTasting, navigate])

  const onSubmitHandler = async (data: TastingT) => {
    dispatch(fetchTastingEditStart(data))
  }

  const disableSave = (): boolean => {
    return false
  }

  return (
    <PageContainer>
      <TastingFormProvider form={ form }>
        <Box
          className={ styles['tastings-container'] }
          component="form"
          // onSubmit={ form.onSubmit(onSubmitHandler) }
        >
          <Box className={ styles.section }>
            <DetailsTasting />
          </Box>
          <Box className={ styles.section }>
            <ColorSmell />
          </Box>
          <Box className={ styles.section }>
            <Taste />
          </Box>
          <Box className={ styles.section }>
            <Review />
          </Box>
        </Box>
        <Footer>
        <Group style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
          <Button color="secondary" disabled={ disableSave() } type="submit" variant="contained">
            Save
          </Button>
          <Button color="info" onClick={ () => { navigate('/') } } variant="outlined">
            Cancel
          </Button>
        </Group>
        </Footer>
      </TastingFormProvider>
    </PageContainer>
  )
}

export default EditTasting
