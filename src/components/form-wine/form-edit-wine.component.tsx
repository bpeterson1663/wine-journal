import { Box, Button, Container, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineEditStart } from '../../features/wine/wineSlice'
import { WineFormT, WineT } from '../../types'
import { FormColorSmell, FormDetails, FormReview, FormTaste } from '../form-steps/form-steps.component'

const EditWineForm = ({ editWine }: { editWine: WineT | null }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
          <FormDetails />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <FormColorSmell />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <FormTaste />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto' }}>
          <FormReview />
        </Box>
        <Box>
          <Button disabled={disableSave()} type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            Save
          </Button>
          <Button onClick={() => navigate('/wines')} variant="outlined" sx={{ mt: 1, mr: 1 }}>
            Cancel
          </Button>
        </Box>
      </Container>
    </FormProvider>
  )
}

export default EditWineForm
