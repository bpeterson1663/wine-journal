import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TastingT, WineT } from '../../types'
import styles from './card.module.css'
interface Props {
  wine: WineT | TastingT
  url: string
}

export function Card({ wine, url }: Props) {
  const navigate = useNavigate()
  const { id, labelUri, producer, vintage, country, varietal } = wine
  return (
    <div key={id} className={`${styles.glass} ${styles.container}`} onClick={() => navigate(`/${url}/${id}`)}>
      <img className={styles.cardImage} src={labelUri || `./static/wine-tasting.jpg`} alt={producer} width={200} />
      <Typography variant="h6">{producer}</Typography>
      <Typography variant="subtitle1">{varietal.join(', ')}</Typography>
      <Typography variant="subtitle1">
        {vintage} - {country}
      </Typography>
    </div>
  )
}
