import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/card/card.component'
import { Header } from '../components/typography/typography.component'
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
      <div className={styles.headerRow}>
        <Header variant="h2" text="Tastings" />
        <Button color="secondary" variant="contained" sx={{ margin: '0 5px ' }} onClick={() => handleNewTasting()}>
          New Tasting
        </Button>
      </div>
      <div className={styles.list}>
        {tastingList.map((tasting) => (
          <Card wine={tasting} url="tasting" showDate />
        ))}
      </div>
    </div>
  )
}
