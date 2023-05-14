import { Button } from '@mui/material'
import { Card } from 'components/card/card.component'
import { Header } from 'components/typography/typography.component'
import { useAppSelector } from 'features/hooks'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/pages.module.css'

export default function Cellar() {
  const { wineList } = useAppSelector((state) => state.wine)
  const navigate = useNavigate()

  return (
    <main className={styles.main}>
      <header className={styles.headerRow}>
        <Header variant="h2" text="Cellar" />
        <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => navigate('/new-wine')}>
          Add Wine
        </Button>
      </header>

      <section className={styles.list}>
        {wineList.map((wine) => (
          <Card key={wine.id} wine={wine} url="cellar" />
        ))}
      </section>
    </main>
  )
}
