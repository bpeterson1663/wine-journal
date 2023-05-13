import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { WineCard } from '../components/wine-card/wine-card.component'
import { useAppSelector } from '../features/hooks'

import styles from './index.module.css'

export default function Cellar() {
  const { wineList } = useAppSelector((state) => state.wine)
  const navigate = useNavigate()

  return (
    <div className={styles.main}>
      <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => navigate('/new-wine')}>
        Add Wine
      </Button>
      <Grid container className={styles.container}>
        {wineList.map((wine) => (
          <WineCard wine={wine} />
        ))}
      </Grid>
    </div>
  )
}
