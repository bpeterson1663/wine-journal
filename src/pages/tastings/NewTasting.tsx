import { Stepper, Box, Button, Group } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import PageContainer from 'components/page-container/page-container.component'
import { useState } from 'react'
import { ColorSmell, DetailsTasting, Review, Taste } from 'components/form-steps'
import { TastingFormProvider, useTastingForm } from 'pages/tastings/form-context'
import { INITIAL_VALUES, TastingSchema, TastingT } from 'schemas/tastings'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import { editWine } from 'features/cellar/cellarSlice'
import { createTasting } from 'features/tasting/tastingSlice'
import Footer from 'components/footer/footer.component'
import styles from 'pages/styles/pages.module.css'

const STEPS = [
  {
    label: 'Details'
  },
  {
    label: 'Color and Smell'
  },
  {
    label: 'Taste'
  },
  {
    label: 'Remarks and Review'
  }
]

const NewTasting = () => {
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const { tastingOpen } = useAppSelector(state => state.tasting)
  const { currentUser } = useAppSelector(state => state.auth)
  const form = useTastingForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      ...tastingOpen,
      date: new Date()
    },
    validate: zodResolver(TastingSchema)
  })

  const onSubmitHandler = async (data: TastingT) => {
    try {
      if (tastingOpen) {
        const quantity = tastingOpen.quantity > 0 ? tastingOpen.quantity - 1 : 0
        await dispatch(editWine({ ...tastingOpen, quantity })).unwrap()
      }
      await dispatch(createTasting({ ...data, userId: currentUser?.uid ?? '' })).unwrap()
      setActiveStep(STEPS.length)
      notifications.show({
        message: 'Your tasting notes were saved.'
      })
    } catch (err) {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'Something went wrong creating your tasting notes.'
      })
    }
  }

  const handleNext = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <DetailsTasting />
      case 1:
        return <ColorSmell />
      case 2:
        return <Taste />
      case 3:
        return <Review />
      default:
        break
    }
  }

  const disableContinue = (): boolean => {
    return false
  }

  const Actions = () => {
    if (activeStep !== STEPS.length) {
      return (
        <Group style={ { width: '100%' } } justify="space-between">
           <Button
            disabled={ activeStep === 0 }
            color="info"
            variant="outline"
            onClick={ handleBack }
            style={ { mt: 1, mr: 1 } }
          >
            Back
          </Button>
          { activeStep === STEPS.length - 1
            ? <Button color="secondary" type="submit" variant="contained">
              Submit
            </Button>
            : <Button
              disabled={ disableContinue() }
              variant="contained"
              color="secondary"
              onClick={ handleNext }
              style={ { mt: 1, mr: 1 } }
            >
              Continue
            </Button>
          }

        </Group>
      )
    }

    return (
      <Group justify="flex-end">
        <Button color="secondary" variant="contained" onClick={ handleReset } style={ { mt: 1, mr: 1 } }>
          Add Another Entry
        </Button>
      </Group>
    )
  }

  return (
    <PageContainer>
      <TastingFormProvider form={ form }>
        <Box className={ styles.form } component="form" onSubmit={ form.onSubmit(onSubmitHandler) }>
          <Stepper
            styles={ {
              stepBody: {
                display: 'none'
              }
            } }
            active={ activeStep }
            allowNextStepsSelect={ false }
          >
            { STEPS.map((step, index) => (
              <Stepper.Step key={ step.label } label={ step.label }>
                  <Box style={ { width: '100%' } }>{ getStepContent(index) }</Box>
              </Stepper.Step>
            )) }
          </Stepper>
          <Footer>
            <Actions />
          </Footer>
        </Box>

      </TastingFormProvider>
    </PageContainer>
  )
}

export default NewTasting
