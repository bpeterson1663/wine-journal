import { Stepper, Group, Button, Box } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { useState } from 'react'
import { DetailsWine, Quantity } from 'components/form-steps'
import { WineFormProvider, useWineForm } from 'pages/cellar/form-context'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { WineT, WineSchema, INITIAL_VALUES } from 'schemas/cellar'
import { notifications } from '@mantine/notifications'
import Footer from 'components/footer/footer.component'
import { fetchWineCreateStart } from 'features/cellar/cellarSlice'
import styles from 'pages/styles/pages.module.css'

const STEPS = [
  {
    label: 'Details'
  },
  {
    label: 'Quantity'
  }
]

export default function NewWine () {
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useAppDispatch()
  const { message, status } = useAppSelector(state => state.cellar)
  const { currentUser } = useAppSelector(state => state.auth)

  const form = useWineForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES
    },
    validate: zodResolver(WineSchema)
  })

  const onSubmitHandler = (data: WineT) => {
    const stringDate = data.date.toISOString()
    dispatch(fetchWineCreateStart({ ...data, date: stringDate, userId: currentUser?.uid ?? '', varietal: [] }))
    form.reset()
    setActiveStep(STEPS.length)
    if (status === 'error') {
      notifications.show({
        message: 'Something went wrong creating wine',
        color: 'red'
      })
    } else {
      notifications.show({
        message
      })
    }
  }

  const handleNext = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    setActiveStep(current => (current < 3 ? current + 1 : current))
  }
  const handleBack = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault()
    setActiveStep(current => (current > 0 ? current - 1 : current))
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <DetailsWine />
      case 1:
        return <Quantity />
      default:
        break
    }
  }

  const disableContinue = (): boolean => {
    if (
      !form.isTouched('producer') ||
      !form.isTouched('country') ||
      !form.isTouched('region') ||
      !form.isTouched('vintage')
      // !form.isTouched('varietal')
    ) {
      return true
    }

    if (Object.keys(form.errors).length > 0) {
      return true
    }
    return false
  }

  return (
    <WineFormProvider form={ form }>
      <Box className={ styles.form } component="form" onSubmit={ form.onSubmit(onSubmitHandler) }>
        <Stepper active={ activeStep } onStepClick={ setActiveStep } allowNextStepsSelect={ false }>
          { STEPS.map((step, index) => (
            <Stepper.Step label={ step.label }>
              { getStepContent(index) }
            </Stepper.Step>
          )) }
        </Stepper>
        <Footer>
        { activeStep !== STEPS.length &&
          <Group justify="flex-end">
            { activeStep === STEPS.length - 1
              ? (
                <Button
                  color="secondary"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
                )
              : (
                <Button
                  disabled={ disableContinue() }
                  variant="contained"
                  color="secondary"
                  name="continue"
                  onClick={ handleNext }
                >
                  Continue
                </Button>
                ) }
              <Button name="back" disabled={ activeStep === 0 } onClick={ handleBack } >
                Back
              </Button>
          </Group>
        }
        { activeStep === STEPS.length &&
          <Group justify="center">
            <Button color="secondary" variant="contained" onClick={ handleReset }>
              Add Another Entry
            </Button>
          </Group>
        }
        </Footer>
      </Box>
    </WineFormProvider>
  )
}
