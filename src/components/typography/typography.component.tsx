import styles from './typography.module.css'

interface HeaderProps {
  variant: 'h1' | 'h2'
  text: string
}

export function Header ({ variant, text }: HeaderProps) {
  switch (variant) {
    case 'h2':
      return <h2 className={ ` ${styles.h2} ${styles.root}` }>{ text }</h2>
    default:
      return <div>{ text }</div>
  }
}
