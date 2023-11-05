import { Box, Button, Container, Paper, Snackbar, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineCreateStart } from 'features/cellar/cellarSlice'
import { WineFormT, WineT } from 'types'
import { Details, Quantity } from 'components/form-steps'
import { notifications } from '@mantine/notifications'

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
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message, status } = useAppSelector(state => state.cellar)
  const { currentUser } = useAppSelector(state => state.auth)
  const methods = useForm<WineFormT>({
    mode: 'all',
    defaultValues: { varietal: [] }
  })

  const onSubmitHandler: SubmitHandler<WineT> = async data => {
    dispatch(fetchWineCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
    notifications.show({
      message
    })
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
        return <Quantity />
      default:
        break
    }
  }

  const disableContinue = (): boolean => {
    const { formState } = methods
    const { errors, touchedFields } = formState
    if (
      !touchedFields.producer ||
      !touchedFields.country ||
      !touchedFields.region ||
      !touchedFields.vintage ||
      !touchedFields.varietal
    ) {
      return true
    }
    if (Object.keys(errors).length > 0) {
      return true
    } else {
      return false
    }
  }

  return (
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
          <Stepper activeStep={ activeStep } orientation="vertical" sx={ { maxWidth: 600, width: '100%', margin: '0 auto' } }>
            { STEPS.map((step, index) => (
              <Step key={ step.label }>
                <StepLabel color="secondary">{ step.label }</StepLabel>
                <StepContent>
                  <Box sx={ { width: '100%' } }>{ getStepContent(index) }</Box>
                  <Box>
                    <>
                      { index === STEPS.length - 1
                        ? (
                        <Button
                          color="secondary"
                          type="submit"
                          variant="contained"
                          onClick={ handleNext }
                          sx={ { mt: 1, mr: 1 } }
                        >
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
                      <Button disabled={ index === 0 } onClick={ handleBack } sx={ { mt: 1, mr: 1 } }>
                        Back
                      </Button>
                    </>
                  </Box>
                </StepContent>
              </Step>
            )) }
          </Stepper>
          { activeStep === STEPS.length && (
            <Paper square elevation={ 0 } sx={ { display: 'flex', justifyContent: 'center' } }>
              <Button color="secondary" variant="contained" onClick={ handleReset } sx={ { mt: 1, mr: 1 } }>
                Add Another Entry
              </Button>
            </Paper>
          ) }
        </Container>
      </FormProvider>
  )
}