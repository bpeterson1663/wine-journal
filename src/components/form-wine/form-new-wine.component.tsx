import React, { useState } from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineCreateStart } from '../../features/wine/wineSlice'
import { Box, Button, Container, Paper, Step, Stepper, StepContent, StepLabel, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { WineFormT, WineT } from '../../types'
import { FormDetails, FormColorSmell, FormTaste, FormReview } from '../form-steps/form-steps.component'
import { STEPS } from './form-wine.constants'

const FormNewWine = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message } = useAppSelector((state) => state.wine)
  const { currentUser } = useAppSelector((state) => state.auth)
  const methods = useForm<WineFormT>({
    mode: 'all',
    defaultValues: { color: 'red', intensity: 'pale', hue: 'purple', rating: 3, varietal: [] },
  })

  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    console.log(data)
    dispatch(fetchWineCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
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
                        Submit
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

export default FormNewWine
