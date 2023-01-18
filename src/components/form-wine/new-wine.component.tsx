import { Box, Button, Container, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineCreateStart } from '../../features/wine/wineSlice'
import { WineFormT, WineT } from '../../types'
import { Details } from '../form-steps'

export const FormNewWine = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { message } = useAppSelector((state) => state.wine)
  const { currentUser } = useAppSelector((state) => state.auth)
  const methods = useForm<WineFormT>({
    mode: 'all',
    defaultValues: { varietal: [] },
  })

  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    dispatch(fetchWineCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
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
        <Details />
        <Box>
          <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            Add
          </Button>
        </Box>
      </Container>
    </FormProvider>
  )
}
