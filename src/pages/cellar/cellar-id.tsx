import { Header } from 'components/typography/typography.component'
import { useNavigate, useParams } from 'react-router-dom'
import { selectWineById } from 'features/wine/wineSelectors'
import styles from 'styles/pages.module.css'
import { useAppSelector } from 'features/hooks'

export default function CellarId() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id || ''
  const wine = useAppSelector(selectWineById(id))

  if (!wine) {
    navigate('/')
  }

  return (
    <main className={styles.main}>
      <header className={styles.headerRow}>
        <Header variant="h2" text="Cellar" />
        {wine?.producer}
      </header>
    </main>
  )
}
