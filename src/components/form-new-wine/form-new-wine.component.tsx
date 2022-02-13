import React, { useState } from 'react'
import { useForm, SubmitHandler, Control, UseFormSetValue } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineCreateStart } from '../../features/wine/wineSlice'
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  Typography,
  Snackbar,
} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { WineT } from '../../types'
import { FormDetails, FormColorSmell, FormTaste, FormReview } from '../form-steps/form-steps.component'
import { STEPS } from './form-new-wine.constants'

const FormNewWine = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message } = useAppSelector((state) => state.wine)
  const { handleSubmit, control, setValue } = useForm<WineT>({
    defaultValues: { color: 'red', intensity: 'pale', hue: 'purple' },
  })
  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    console.log(data)
    dispatch(fetchWineCreateStart(data))
    setOpen(true)
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = (index: number, control: Control<WineT>, setValue: UseFormSetValue<WineT>) => {
    switch (index) {
      case 0:
        return <FormDetails control={control} />
      case 1:
        return <FormColorSmell control={control} setValue={setValue} />
      case 2:
        return <FormTaste control={control} />
      case 3:
        return <FormReview control={control} />
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
  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        maxWidth: 600,
        width: '90%',
      }}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
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
              <Box sx={{ width: '100%' }}>{getStepContent(index, control, setValue)}</Box>
              <Box>
                <>
                  {index === STEPS.length - 1 ? (
                    <Button type="submit" variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      Submit
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
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
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Container>
  )
}

export default FormNewWine
