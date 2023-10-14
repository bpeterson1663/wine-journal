import { Box, Container, Snackbar } from '@mui/material'
import { Button, Alert } from '@mantine/core'
import PageContainer from '../../components/page-container/page-container.component'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { notifications } from '@mantine/notifications'

import React, { useState, useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchWineCreateStart } from 'features/cellar/cellarSlice'
import { WineFormT, WineT } from 'types'
import { Details, Quantity } from 'components/form-steps'
import { useNavigate } from 'react-router-dom'

export default function EditWine () {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { editWine, message } = useAppSelector(state => state.cellar)
  const { currentUser } = useAppSelector(state => state.auth)
  const methods = useForm<WineFormT>({
    mode: 'all',
    defaultValues: { ...editWine }
  })

  useEffect(() => {
    if (!editWine) {
      navigate('/cellar')
    }
  }, [editWine, navigate])

  const onSubmitHandler: SubmitHandler<WineT> = async data => {
    dispatch(fetchWineCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
    // setOpen(true)
    notifications.show({
      message
    })
    // setTimeout(() => { setOpen(false) }, 5000)
  }

  // const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
  //   return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
  // })

  // const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setOpen(false)
  // }

  const disableSave = (): boolean => {
    const { formState } = methods
    const { errors } = formState

    if (Object.keys(errors).length > 0) {
      return true
    } else {
      return false
    }
  }

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" disabled={ disableSave() } type="submit" variant="contained">
        Save
      </Button>
      <Button color="info" onClick={ () => { navigate('/cellar') } } variant="outlined">
        Cancel
      </Button>
    </div>
  )

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
        { /* <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
          <Alert onClose={ handleClose } severity="success" sx={ { width: '100%' } }>
            { message }
          </Alert>
        </Snackbar> */ }
        <Box sx={ { width: '100%', maxWidth: 600, margin: '10px auto' } }>
          <Details />
        </Box>
        <Box sx={ { width: '100%', maxWidth: 600, margin: '10px auto' } }>
          <Quantity />
        </Box>
        <Box>
          <Button disabled={ disableSave() } type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={ () => { navigate('/cellar') } } variant="outlined">
            Cancel
          </Button>
        </Box>
      </Container>
    </FormProvider>
    </PageContainer>
  )
}
