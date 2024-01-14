import { ReactNode } from 'react'
import { Title } from '@mantine/core'

import styles from 'components/page-container/page-container.module.css'

interface Props {
  children?: ReactNode
  title?: string
}

export default function PageContainer({ children, title = '' }: Props) {
  return (
    <main className={styles.main}>
      <header className={styles['header-row']}>
        <Title order={2}> {title} </Title>
      </header>
      {children}
    </main>
  )
}
