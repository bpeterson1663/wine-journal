import { useEffect } from 'react'
import { Button, Box } from '@mantine/core'
import PageContainer from 'components/page-container/page-container.component'
import { notifications } from '@mantine/notifications'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchWineCreateStart } from 'features/cellar/cellarSlice'
import { WineFormT, WineT } from 'types'
import { Details, Quantity } from 'components/form-steps'
import { useNavigate } from 'react-router-dom'

export default function EditWine () {
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
    notifications.show({
      message
    })
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
        <Box
          component="form"
          onSubmit={ methods.handleSubmit(onSubmitHandler) }
        >
          <Box>
            <Details />
          </Box>
          <Box>
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
        </Box>
      </FormProvider>
    </PageContainer>
  )
}
