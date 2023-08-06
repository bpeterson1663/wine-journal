import { Box, Button, Container, Snackbar, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import PageContainer from 'components/page-container/page-container.component'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ColorSmell, Details, Review, Taste } from '../../components/form-steps'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchTastingCreateStart } from '../../features/tasting/tastingSlice'
import { TastingFormT, TastingT } from '../../types'

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
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message } = useAppSelector(state => state.tasting)
  const { currentUser } = useAppSelector(state => state.auth)
  const methods = useForm<TastingFormT>({
    mode: 'all',
    defaultValues: {
      color: 'red',
      intensity: 'pale',
      hue: 'purple',
      rating: 3,
      date: new Date().toISOString().split('T')[0]
    }
  })

  const onSubmitHandler: SubmitHandler<TastingT> = async data => {
    dispatch(fetchTastingCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
    setOpen(true)
    setTimeout(() => { setOpen(false) }, 5000)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    methods.reset()
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
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
  })
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const disableContinue = (): boolean => {
    const { formState } = methods
    const { errors, touchedFields } = formState

    if (activeStep === 0) {
      if (
        !touchedFields.producer ||
        !touchedFields.country ||
        !touchedFields.region ||
        !touchedFields.vintage ||
        !touchedFields.varietal
      ) {
        return true
      }
    } else if (activeStep === 1) {
      if (!touchedFields.smell) {
        return true
      }
    }

    if (Object.keys(errors).length > 0) {
      return true
    } else {
      return false
    }
  }

  const Actions = () => {
    if (activeStep !== STEPS.length) {
      return (
        <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
          { activeStep === STEPS.length - 1
            ? (
            <Button color="secondary" type="submit" variant="contained" onClick={ handleNext } sx={ { mt: 1, mr: 1 } }>
              Submit
            </Button>
              )
            : (
            <Button
              disabled={ disableContinue() }
              variant="contained"
              color="secondary"
              onClick={ handleNext }
              sx={ { mt: 1, mr: 1 } }
            >
              Continue
            </Button>
              ) }
          <Button
            disabled={ activeStep === 0 }
            color="info"
            variant="outlined"
            onClick={ handleBack }
            sx={ { mt: 1, mr: 1 } }
          >
            Back
          </Button>
        </div>
      )
    }

    return (
      <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
        <Button color="secondary" variant="contained" onClick={ handleReset } sx={ { mt: 1, mr: 1 } }>
          Add Another Entry
        </Button>
      </div>
    )
  }

  return (
    <PageContainer actions={ <Actions /> }>
      <FormProvider { ...methods }>
        <Container
          sx={ {
            display: 'flex',
            flexFlow: 'column wrap',
            maxWidth: 600,
            width: '90%'
          } }
          component="form"
          onSubmit={ methods.handleSubmit(onSubmitHandler) }
        >
          <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity="success" sx={ { width: '100%' } }>
              { message }
            </Alert>
          </Snackbar>
          <Stepper
            activeStep={ activeStep }
            orientation="vertical"
            sx={ { maxWidth: 600, width: '100%', margin: '0 auto' } }
          >
            { STEPS.map((step, index) => (
              <Step key={ step.label }>
                <StepLabel color="secondary">{ step.label }</StepLabel>
                <StepContent>
                  <Box sx={ { width: '100%' } }>{ getStepContent(index) }</Box>
                </StepContent>
              </Step>
            )) }
          </Stepper>
        </Container>
      </FormProvider>
    </PageContainer>
  )
}

export default NewWine
