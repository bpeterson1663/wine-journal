import { Box, Button } from '@mantine/core'
import PageContainer from 'components/page-container/page-container.component'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorSmell, Details, Review, Taste } from 'components/form-steps'
import { useAppSelector } from 'features/hooks'
// import { fetchTastingEditStart } from 'features/tasting/tastingSlice'
// import { TastingFormT, TastingT } from 'types'
import styles from 'pages/tastings/tastings.module.css'

const EditTasting = () => {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { editTasting } = useAppSelector(state => state.tasting)

  useEffect(() => {
    if (!editTasting) {
      navigate('/')
    }
  }, [editTasting, navigate])

  // const onSubmitHandler = async (data: TastingT) => {
  //   dispatch(fetchTastingEditStart(data))
  // }

  const disableSave = (): boolean => {
    return false
  }

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" disabled={ disableSave() } type="submit" variant="contained">
        Save
      </Button>
      <Button color="info" onClick={ () => { navigate('/') } } variant="outlined">
        Cancel
      </Button>
    </div>
  )

  return (
    <PageContainer actions={ <Actions /> }>
        <Box
          className={ styles['tastings-container'] }
          component="form"
          // onSubmit={ onSubmitHandler }
        >
          <Box className={ styles.section }>
            <Details />
          </Box>
          <Box className={ styles.section }>
            <ColorSmell />
          </Box>
          <Box className={ styles.section }>
            <Taste />
          </Box>
          <Box className={ styles.section }>
            <Review />
          </Box>
        </Box>
    </PageContainer>
  )
}

export default EditTasting
