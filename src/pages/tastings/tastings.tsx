import { Button } from '@mui/material'
import { Card } from 'components/card/card.component'
import { Header } from 'components/typography/typography.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { tastingSetOpen } from 'features/tasting/tastingSlice'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/pages.module.css'

export default function Tastings() {
  const dispatch = useAppDispatch()
  const { tastingList } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    dispatch(tastingSetOpen(null))
    navigate('/new-tasting')
  }

  return (
    <main className={styles.main}>
      <header className={styles.headerRow}>
        <Header variant="h2" text="Tastings" />
        <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => handleNewTasting()}>
          New Tasting
        </Button>
      </header>
      <section className={styles.list}>
        {tastingList.map((tasting) => (
          <Card key={tasting.id} wine={tasting} url="tasting" showDate />
        ))}
      </section>
    </main>
  )
}
