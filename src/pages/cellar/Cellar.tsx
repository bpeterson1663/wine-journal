import PageContainer from 'components/page-container/page-container.component'
import { Card } from 'components/card/card.component'
import { useAppSelector } from 'features/hooks'

import styles from 'pages/styles/pages.module.css'

export default function Cellar () {
  const { wineList } = useAppSelector(state => state.cellar)

  return (
        <PageContainer title="Cellar">
            <section className={ styles.list }>
        { wineList.map(wine => (
          <Card key={ wine.id } wine={ wine } url="cellar" />
        )) }
      </section>
        </PageContainer>
  )
}
