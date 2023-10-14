import { Title, Text } from '@mantine/core'
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
          <Text size="sm">{ date }</Text>
        </div>
      ) }
      <div className={ styles.row }>
        <div className={ styles.column }>
          <img className={ styles.cardImage } src={ labelUri ?? require('images/wine-tasting.jpg') } alt={ producer } />
        </div>
        <div className={ styles.column }>
          <Title order={ 3 }>{ producer }</Title>
          <Text size="md">{ varietal.join(', ') }</Text>
          <Text size="sm">{ vintage }</Text>
          <Text size="sm">{ region }</Text>
        </div>
      </div>
    </div>
  )
}
