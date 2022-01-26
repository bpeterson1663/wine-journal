import React, { useState } from 'react'
import { useForm, SubmitHandler, Control } from 'react-hook-form'
import { Box, Button, Container, Paper, Step, Stepper, StepContent, StepLabel, Typography } from '@mui/material'
import { WineT } from '../../types'
import { addWineEntry } from '../../api'
import { FormDetails, FormColorSmell, FormTaste, FormReview } from '../form-steps/form-steps.component'
import { STEPS } from './form-new-wine.constants'

const FormNewWine = () => {
  const [activeStep, setActiveStep] = useState(0)

  const { handleSubmit, control } = useForm<WineT>({
    defaultValues: { color: 'red', intensity: 'pale', hue: 'purple' },
  })
  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    console.log(data)
    const response = await addWineEntry(data)
    console.log('response: ', response)
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

  const getStepContent = (index: number, control: Control<WineT>) => {
    switch (index) {
      case 0:
        return <FormDetails control={control} />
      case 1:
        return <FormColorSmell control={control} />
      case 2:
        return <FormTaste control={control} />
      case 3:
        return <FormReview control={control} />
      default:
        break
    }
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
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
                <Box sx={{width: '100%'}}>
                {getStepContent(index, control)}

                </Box>
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
