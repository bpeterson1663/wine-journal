import { Grid, Typography } from '@mui/material'
import { TastingT } from '../../types'
import styles from './tasting-card.module.css'

interface Props {
  tasting: TastingT
}

export function TastingCard({ tasting }: Props) {
  const { id, labelUri, producer, vintage, country, varietal, date } = tasting
  return (
    <Grid key={id} className={styles.container}>
      <img
        className={styles.cardImage}
        src={labelUri || `./static/wine-tasting.jpg`}
        alt={producer}
        width={200}
        height={250}
      />
      <Typography variant="subtitle2">{date}</Typography>
      <Typography variant="h6">{producer}</Typography>
      <Typography variant="subtitle1">{varietal.join(', ')}</Typography>
      <Typography variant="subtitle1">
        {vintage} - {country}
      </Typography>
    </Grid>
  )
}
