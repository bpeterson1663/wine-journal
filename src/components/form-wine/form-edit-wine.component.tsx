import React, { useState } from 'react'
import { Container, Stepper, Step, StepLabel, StepContent, Box, Button, Paper, Snackbar } from '@mui/material'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineEditStart } from '../../features/wine/wineSlice'
import { WineT, WineFormT } from '../../types'
import { FormDetails, FormColorSmell, FormTaste, FormReview } from '../form-steps/form-steps.component'
import { STEPS } from './form-wine.constants'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const EditWineForm = ({ editWine }: { editWine: WineT | null }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message } = useAppSelector((state) => state.wine)
  const methods = useForm<WineFormT>({
    mode: 'all',
    defaultValues: { ...editWine },
  })
  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    dispatch(fetchWineEditStart(data))
    setOpen(true)
    setTimeout(() => setOpen(false), 5000)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    methods.reset()
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const disableContinue = (): boolean => {
    const { formState } = methods
    const { errors } = formState

    if (Object.keys(errors).length > 0) {
      return true
    } else {
      return false
    }
  }
  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <FormDetails />
      case 1:
        return <FormColorSmell />
      case 2:
        return <FormTaste />
      case 3:
        return <FormReview />
      default:
        break
    }
  }
  return (
    <FormProvider {...methods}>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column wrap',
          maxWidth: 600,
          width: '90%',
        }}
        component="form"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
          {STEPS.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box sx={{ width: '100%' }}>{getStepContent(index)}</Box>
                <Box>
                  <>
                    {index === STEPS.length - 1 ? (
                      <Button type="submit" variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        disabled={disableContinue()}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                    )}
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === STEPS.length && (
          <Paper square elevation={0} sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Add Another Wine
            </Button>
          </Paper>
        )}
      </Container>
    </FormProvider>
  )
}

export default EditWineForm
