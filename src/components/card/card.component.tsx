import { Typography } from '@mui/material'
import styles from 'components/card/card.module.css'
import { useNavigate } from 'react-router-dom'
import type { TastingT, WineT } from 'types'

interface Props {
  wine: WineT | TastingT
  url: string
  showDate?: boolean
}

export function Card ({ wine, url, showDate = false }: Props) {
  const navigate = useNavigate()
  const { id, labelUri, producer, vintage, region, varietal, date } = wine
  return (
    <div key={ id } className={ `${styles.glass} ${styles.container}` } onClick={ () => { navigate(`/${url}/${id}`) } }>
      { showDate && (
        <div className={ styles.row }>
          <Typography variant="subtitle2">{ date }</Typography>
        </div>
      ) }
      <div className={ styles.row }>
        <div className={ styles.column }>
          <img className={ styles.cardImage } src={ labelUri ?? require('images/wine-tasting.jpg') } alt={ producer } />
        </div>
        <div className={ styles.column }>
          <Typography variant="h6">{ producer }</Typography>
          <Typography variant="subtitle1">{ varietal.join(', ') }</Typography>
          <Typography variant="subtitle2">{ vintage }</Typography>
          <Typography variant="subtitle2">{ region }</Typography>
        </div>
      </div>
    </div>
  )
}
