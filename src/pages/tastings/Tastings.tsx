import { useEffect } from 'react'
import { Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { Card } from 'components/card/card.component'
import PageContainer from 'components/page-container/page-container.component'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import styles from 'pages/styles/pages.module.css'
import { useNavigate } from 'react-router-dom'
import Footer from 'components/footer/footer.component'
import { fetchTastings } from 'features/tasting/tastingSlice'

export default function Tastings () {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.auth)
  const { tastingList } = useAppSelector(state => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    navigate('/tastings/new')
  }

  useEffect(() => {
    dispatch(fetchTastings(currentUser?.uid ?? '')).catch(err => {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'An error occurred loading your tastings'
      })
    })
  }, [dispatch, currentUser])

  return (
    <PageContainer title="Tastings">
      <section className={ styles.list }>
        { [...tastingList]
          .sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()))
          .map(tasting => (
          <Card key={ tasting.id } wine={ tasting } url="tastings" showDate />
          )) }
      </section>
      <Footer>
        <Group justify="flex-end">
          <Button color="secondary" variant="contained" style={ { margin: '0 5px ' } } onClick={ () => { handleNewTasting() } }>
            New Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
