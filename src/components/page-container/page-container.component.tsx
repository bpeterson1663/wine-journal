import { ReactNode } from 'react'
import Footer from '../footer/footer.component'
import { Header } from '../typography/typography.component'
import styles from './page-container.module.css'

interface Props {
  children?: ReactNode
  title?: string
  actions?: ReactNode
}

export default function PageContainer({ children, title = '', actions = null }: Props) {
  return (
    <main className={styles['main']}>
      <header className={styles['header-row']}>
        <Header variant="h2" text={title} />
      </header>
      {children}
      <Footer>{actions}</Footer>
    </main>
  )
}
