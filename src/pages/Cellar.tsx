import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/card/card.component'
import { useAppSelector } from '../features/hooks'
import styles from './index.module.css'

export default function Cellar() {
  const { wineList } = useAppSelector((state) => state.wine)
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <div className={styles.headerRow}>
        <Typography variant="h2">Cellar</Typography>
        <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => navigate('/new-wine')}>
          Add Wine
        </Button>
      </div>

      <div className={styles.list}>
        {wineList.map((wine) => (
          <Card key={wine.id} wine={wine} url="cellar" />
        ))}
      </div>
    </div>
  )
}
