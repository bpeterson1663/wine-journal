import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import PageContainer from 'components/page-container/page-container.component'
import { Card } from 'components/card/card.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from 'pages/styles/pages.module.css'
import Footer from 'components/footer/footer.component'
import { fetchWines } from 'features/cellar/cellarSlice'

export default function Cellar() {
  const dispatch = useAppDispatch()
  const [disableLoadMore, setDisableLoadMore] = useState(false)
  const { wineList } = useAppSelector((state) => state.cellar)
  const { currentUser } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const handleNewWine = () => {
    navigate('/cellar/new')
  }

  useEffect(() => {
    const onLoad = async () => {
      if (currentUser) {
        try {
         const { docs } = await dispatch(fetchWines({userId: currentUser.uid})).unwrap()
         if (docs.length < 10) {
          setDisableLoadMore(true)
         }
        } catch (err) {
          console.error(err)
          notifications.show({
            color: 'red',
            message: 'An error occurred loading your wines from your cellar',
          })
        }
      }
      
    }
    onLoad()
  }, [dispatch, currentUser])

  const handleNext = async (lastId: string) => {
    const {docs} = await dispatch(fetchWines({userId: currentUser?.uid ?? '', previousDoc: lastId})).unwrap()
    if (docs.length < 10) {
      setDisableLoadMore(true)
    }
  }

  return (
    <PageContainer title="Cellar">
      <section className={styles.list}>
        {wineList.map((wine) => (
          <Card key={wine.id} wine={wine} url="cellar" />
        ))}
      </section>
      <div className={styles['load-more-container']}>
        <Button disabled={disableLoadMore} variant="outline" onClick={() => handleNext(wineList[wineList.length -1].id)}>Load More</Button>
      </div>
      <Footer>
        <Group justify="flex-end">
          <Button
            onClick={() => {
              handleNewWine()
            }}
          >
            Add Wine
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
