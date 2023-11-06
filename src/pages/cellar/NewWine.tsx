import { Stepper, Group, Button, Box } from '@mantine/core'
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
  const dispatch = useAppDispatch()
  const { message } = useAppSelector(state => state.cellar)
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

  const handleNext = () => { setActiveStep(current => (current < 3 ? current + 1 : current)) }
  const handleBack = () => { setActiveStep(current => (current > 0 ? current - 1 : current)) }

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
        <Box
          component="form"
          onSubmit={ methods.handleSubmit(onSubmitHandler) }
        >
          <Stepper active={ activeStep } onStepClick={ setActiveStep } allowNextStepsSelect={ false }>
            { STEPS.map((step, index) => (
              <Stepper.Step label={ step.label } description="Create an account">
                { getStepContent(index) }
              </Stepper.Step>
            )) }
          </Stepper>
          <Group justify="center" mt="xl">
          { activeStep === STEPS.length - 1
            ? (
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                onClick={ handleNext }
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

              >
                Continue
              </Button>
              ) }
              <Button disabled={ activeStep === 0 } onClick={ handleBack } >
                Back
              </Button>
          </Group>
          { activeStep === STEPS.length && (
            <Box>
              <Button color="secondary" variant="contained" onClick={ handleReset }>
                Add Another Entry
              </Button>
            </Box>
          ) }
        </Box>
      </FormProvider>
  )
}
