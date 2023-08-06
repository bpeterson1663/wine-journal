import { Button } from '@mui/material'
import { Card } from 'components/card/card.component'
import PageContainer from 'components/page-container/page-container.component'
import { useAppSelector } from 'features/hooks'
import styles from 'pages/styles/pages.module.css'
import { useNavigate } from 'react-router-dom'

export default function Tastings () {
  const { tastingList } = useAppSelector(state => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    navigate('/tastings/new')
  }

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" variant="contained" sx={ { margin: '0 5px ' } } onClick={ () => { handleNewTasting() } }>
        New Tasting
      </Button>
    </div>
  )

  return (
    <PageContainer title="Tastings" actions={ <Actions /> }>
      <section className={ styles.list }>
        { [...tastingList]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map(tasting => (
          <Card key={ tasting.id } wine={ tasting } url="tastings" showDate />
          )) }
      </section>
    </PageContainer>
  )
}
