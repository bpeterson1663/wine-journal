import { useEffect } from 'react'
import { notifications } from '@mantine/notifications'
import PageContainer from 'components/page-container/page-container.component'
import { Card } from 'components/card/card.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from 'pages/styles/pages.module.css'
import Footer from 'components/footer/footer.component'
import { fetchWines } from 'features/cellar/cellarSlice'

export default function Cellar () {
  const dispatch = useAppDispatch()
  const { wineList } = useAppSelector(state => state.cellar)
  const { currentUser } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  const handleNewWine = () => {
    navigate('/cellar/new')
  }

  useEffect(() => {
    dispatch(fetchWines(currentUser?.uid ?? '')).catch(err => {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'An error occurred loading your wines from your cellar'
      })
    })
  }, [dispatch, currentUser])

  return (
    <PageContainer title="Cellar">
      <section className={ styles.list }>
        { wineList.map(wine => (
          <Card key={ wine.id } wine={ wine } url="cellar" />
        )) }
      </section>
      <Footer>
        <Group justify="flex-end">
          <Button color="secondary" variant="contained" onClick={ () => { handleNewWine() } }>
            Add Wine
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
