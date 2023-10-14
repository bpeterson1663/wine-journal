import { ReactNode } from 'react'
import Footer from 'components/footer/footer.component'
import { Title } from '@mantine/core'
import styles from 'components/page-container/page-container.module.css'

interface Props {
  children?: ReactNode
  title?: string
  actions?: ReactNode
}

export default function PageContainer ({ children, title = '', actions = null }: Props) {
  return (
    <main className={ styles.main }>
      <header className={ styles['header-row'] }>
        <Title order={ 2 }> { title } </Title>
      </header>
      { children }
      <Footer>{ actions }</Footer>
    </main>
  )
}
