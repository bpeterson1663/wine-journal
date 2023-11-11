import PageContainer from 'components/page-container/page-container.component'
import { Card } from 'components/card/card.component'
import { useAppSelector } from 'features/hooks'
import { Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import styles from 'pages/styles/pages.module.css'
import Footer from 'components/footer/footer.component'

export default function Cellar () {
  const { wineList } = useAppSelector(state => state.cellar)
  const navigate = useNavigate()

  const handleNewWine = () => {
    navigate('/cellar/new')
  }

  return (
    <PageContainer title="Cellar">
      <section className={ styles.list }>
        { wineList.map(wine => (
          <Card key={ wine.id } wine={ wine } url="cellar" />
        )) }
      </section>
      <Footer>
        <Group justify="flex-end">
          <Button color="secondary" variant="contained" onClick={ () => { handleNewWine() } }>
            Add Wine
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  )
}
