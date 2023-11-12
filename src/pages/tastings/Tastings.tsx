import { Button, Group } from '@mantine/core'
import { Card } from 'components/card/card.component'
import PageContainer from 'components/page-container/page-container.component'
import { useAppSelector } from 'features/hooks'
import styles from 'pages/styles/pages.module.css'
import { useNavigate } from 'react-router-dom'
import Footer from 'components/footer/footer.component'

export default function Tastings () {
  const { tastingList } = useAppSelector(state => state.tasting)
  const navigate = useNavigate()

  const handleNewTasting = () => {
    navigate('/tastings/new')
  }

  return (
    <PageContainer title="Tastings">
      <section className={ styles.list }>
        { [...tastingList]
          .sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()))
          .map(tasting => (
          <Card key={ tasting.id } wine={ tasting } url="tastings" showDate />
          )) }
      </section>
      <Footer>
        <Group style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
          <Button color="secondary" variant="contained" style={ { margin: '0 5px ' } } onClick={ () => { handleNewTasting() } }>
            New Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
