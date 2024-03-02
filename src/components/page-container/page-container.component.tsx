import { ReactNode } from 'react'
import { Title } from '@mantine/core'

import styles from 'components/page-container/page-container.module.css'
import { BackButton } from 'components/back-button/back-button.component'

interface Props {
  children?: ReactNode
  title?: string
  showBack?: boolean
}

export default function PageContainer({ children, title = '', showBack = false }: Props) {
  return (
    <main className={styles.main}>
      {showBack && <BackButton />}
      <header className={styles['header-row']}>
        <Title order={2}> {title} </Title>
      </header>
      {children}
    </main>
  )
}
