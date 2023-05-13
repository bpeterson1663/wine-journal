import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TastingCard } from '../components/tasting-card/tasting-card.component'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { tastingSetOpen } from '../features/tasting/tastingSlice'
import styles from './index.module.css'

export default function Tastings() {
  const dispatch = useAppDispatch()
  const { tastingList } = useAppSelector((state) => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    dispatch(tastingSetOpen(null))
    navigate('/new-tasting')
  }

  return (
    <div className={styles.main}>
      <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => handleNewTasting()}>
        New Tasting
      </Button>
      <Grid container className={styles.container}>
        {tastingList.map((tasting) => (
          <TastingCard tasting={tasting} />
        ))}
      </Grid>
    </div>
  )
}
