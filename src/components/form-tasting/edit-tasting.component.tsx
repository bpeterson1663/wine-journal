import { Box, Button, Container, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchTastingEditStart } from '../../features/tasting/tastingSlice'
import { TastingFormT, TastingT } from '../../types'
import { ColorSmell, Details, Review, Taste } from '../form-steps'

export const EditTastingForm = ({ editTasting }: { editTasting: TastingT | null }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { message } = useAppSelector((state) => state.tasting)
  const methods = useForm<TastingFormT>({
    mode: 'all',
    defaultValues: { ...editTasting },
  })
  const onSubmitHandler: SubmitHandler<TastingT> = async (data) => {
    dispatch(fetchTastingEditStart(data))
    setOpen(true)
    setTimeout(() => setOpen(false), 5000)
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

  const disableSave = (): boolean => {
    const { formState } = methods
    const { errors } = formState

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
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <Details />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <ColorSmell />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <Taste />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <Review />
        </Box>
        <Box>
          <Button disabled={disableSave()} type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            Save
          </Button>
          <Button onClick={() => navigate('/tastings')} variant="outlined" sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
        </Box>
      </Container>
    </FormProvider>
  )
}