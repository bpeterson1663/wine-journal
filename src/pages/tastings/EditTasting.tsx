import { Box, Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { zodResolver } from '@mantine/form'
import PageContainer from 'components/page-container/page-container.component'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorSmell, DetailsTasting, Review, Taste } from 'components/form-steps'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import { editTasting } from 'features/tasting/tastingSlice'
import styles from 'pages/styles/pages.module.css'
import { TastingFormProvider, useTastingForm } from 'pages/tastings/form-context'
import { TastingSchema, TastingT, INITIAL_VALUES } from 'schemas/tastings'
import Footer from 'components/footer/footer.component'

const EditTasting = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { tasting } = useAppSelector(state => state.tasting)

  const form = useTastingForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...tasting
    },
    validate: zodResolver(TastingSchema)
  })

  useEffect(() => {
    if (!tasting) {
      navigate('/')
    }
  }, [tasting, navigate])

  const onSubmitHandler = async (data: TastingT) => {
    try {
      await dispatch(editTasting(data)).unwrap()
      notifications.show({
        message: 'Your tasting was updated.'
      })
    } catch (err) {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'Something went wrong updating your tasting.'
      })
    }
  }

  const disableSave = (): boolean => {
    if (Object.keys(form.errors).length > 0) {
      return true
    }
    return false
  }

  return (
    <PageContainer>
      <TastingFormProvider form={ form }>
        <Box
          className={ styles.form }
          component="form"
          onSubmit={ form.onSubmit(onSubmitHandler) }
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
          <Footer>
            <Group style={ { width: '100%' } } justify="space-between">
              <Button onClick={ () => { navigate('/') } } variant="outline">
                Cancel
              </Button>
              <Button disabled={ disableSave() } type="submit" variant="contained">
                Save
              </Button>
            </Group>
          </Footer>
        </Box>
      </TastingFormProvider>
    </PageContainer>
  )
}

export default EditTasting
