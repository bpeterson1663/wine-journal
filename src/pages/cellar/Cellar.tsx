import PageContainer from 'components/page-container/page-container.component'
import { Card } from 'components/card/card.component'
import { useAppSelector } from 'features/hooks'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from 'pages/styles/pages.module.css'

export default function Cellar () {
  const { wineList } = useAppSelector(state => state.cellar)
  const navigate = useNavigate()

  const handleNewWine = () => {
    navigate('/cellar/new')
  }

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" variant="contained" sx={ { margin: '0 5px ' } } onClick={ () => { handleNewWine() } }>
        Add Wine
      </Button>
    </div>
  )

  return (
        <PageContainer title="Cellar" actions={ <Actions /> } >
            <section className={ styles.list }>
        { wineList.map(wine => (
          <Card key={ wine.id } wine={ wine } url="cellar" />
        )) }
      </section>
        </PageContainer>
  )
}
