import { Stepper, Box, Button } from '@mantine/core'
import PageContainer from 'components/page-container/page-container.component'
import { useState } from 'react'
import { ColorSmell, Details, Review, Taste } from 'components/form-steps'

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

const NewWine = () => {
  const [activeStep, setActiveStep] = useState(0)
  // const dispatch = useAppDispatch()
  // const { tastingOpen } = useAppSelector(state => state.tasting)
  // const { currentUser } = useAppSelector(state => state.auth)

  // const onSubmitHandler: SubmitHandler<TastingT> = async data => {
  //   if (tastingOpen) {
  //     const quantity = tastingOpen.quantity > 0 ? tastingOpen.quantity - 1 : 0
  //     dispatch(fetchWineEditStart({ ...tastingOpen, quantity }))
  //   }
  //   dispatch(fetchTastingCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
  // }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <Details />
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
        <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
          { activeStep === STEPS.length - 1
            ? (
            <Button color="secondary" type="submit" variant="contained" onClick={ handleNext } style={ { mt: 1, mr: 1 } }>
              Submit
            </Button>
              )
            : (
            <Button
              disabled={ disableContinue() }
              variant="contained"
              color="secondary"
              onClick={ handleNext }
              style={ { mt: 1, mr: 1 } }
            >
              Continue
            </Button>
              ) }
          <Button
            disabled={ activeStep === 0 }
            color="info"
            variant="outlined"
            onClick={ handleBack }
            style={ { mt: 1, mr: 1 } }
          >
            Back
          </Button>
        </div>
      )
    }

    return (
      <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
        <Button color="secondary" variant="contained" onClick={ handleReset } style={ { mt: 1, mr: 1 } }>
          Add Another Entry
        </Button>
      </div>
    )
  }

  return (
    <PageContainer actions={ <Actions /> }>
        <Box
          style={ {
            display: 'flex',
            flexFlow: 'column wrap',
            maxWidth: 600,
            width: '90%'
          } }
          component="form"
        >
          <Stepper
            active={ activeStep }
            orientation="vertical"
            style={ { maxWidth: 600, width: '100%', margin: '0 auto' } }
          >
            { STEPS.map((step, index) => (
              <Stepper.Step key={ step.label } label={ step.label }>
                  <Box style={ { width: '100%' } }>{ getStepContent(index) }</Box>
              </Stepper.Step>
            )) }
          </Stepper>
        </Box>
    </PageContainer>
  )
}

export default NewWine
