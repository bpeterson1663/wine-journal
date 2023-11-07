import { useEffect } from 'react'
import { Button, Box } from '@mantine/core'
import PageContainer from 'components/page-container/page-container.component'
// import { notifications } from '@mantine/notifications'

import { useAppSelector } from 'features/hooks'
import { Details, Quantity } from 'components/form-steps'
import { useNavigate } from 'react-router-dom'

export default function EditWine () {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { editWine } = useAppSelector(state => state.cellar)
  // const { currentUser } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!editWine) {
      navigate('/cellar')
    }
  }, [editWine, navigate])

  // const onSubmitHandler = async (data: WineT) => {
  //   dispatch(fetchWineCreateStart({ ...data, userId: currentUser?.uid ?? '' }))
  //   notifications.show({
  //     message
  //   })
  // }

  const disableSave = (): boolean => {
    return false
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
        <Box
          component="form"
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
    </PageContainer>
  )
}
