import { useEffect, useState } from 'react'
import { Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { Card } from 'components/card/card.component'
import PageContainer from 'components/page-container/page-container.component'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import styles from 'pages/styles/pages.module.css'
import { useNavigate } from 'react-router-dom'
import Footer from 'components/footer/footer.component'
import { fetchTastings } from 'features/tasting/tastingSlice'

export default function Tastings() {
  const dispatch = useAppDispatch()
  const [disableLoadMore, setDisableLoadMore] = useState(false)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { tastingList } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    navigate('/tastings/new')
  }

  useEffect(() => {
    const onLoad = async () => {
      if (currentUser) {
        try {
         const { docs } = await dispatch(fetchTastings({userId: currentUser.uid})).unwrap()
         if (docs.length < 10) {
          setDisableLoadMore(true)
         }
        } catch (err) {
          console.error(err)
          notifications.show({
            color: 'red',
            message: 'An error occurred loading your tastings',
          })
        }
      }
      
    }
    onLoad()
  }, [dispatch, currentUser])

  const handleNext = async (lastId: string) => {
    const {docs} = await dispatch(fetchTastings({userId: currentUser?.uid ?? '', previousDoc: lastId})).unwrap()
    if (docs.length < 10) {
      setDisableLoadMore(true)
    }
  }

  const sortedList = [...tastingList]
      .sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()))
  
  return (
    <PageContainer title="Tastings">
      <section className={styles.list}>
        {sortedList
          .map((tasting) => (
            <Card key={tasting.id} wine={tasting} url="tastings" showDate />
          ))} 
      </section>
      <div className={styles['load-more-container']}>
        <Button disabled={disableLoadMore} variant="outline" onClick={() => handleNext(sortedList[sortedList.length -1].id)}>Load More</Button>
      </div>

      <Footer>
        <Group justify="flex-end">
          <Button
            style={{ margin: '0 5px ' }}
            onClick={() => {
              handleNewTasting()
            }}
          >
            New Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
