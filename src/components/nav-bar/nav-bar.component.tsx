import { ActionIcon, Avatar, Container, Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'features/hooks'

import styles from 'components/nav-bar/nav-bar.module.css'

const NavBar = () => {
  const { currentUser } = useAppSelector(state => state.auth)
  const { userProfile } = useAppSelector(state => state.user)

  function getInitials () {
    const first = userProfile?.firstName[0] ?? ''
    const last = userProfile?.lastName[0] ?? ''
    return `${first}${last}`
  }

  return (
    <header className={ styles['nav-bar'] }>
        { currentUser && (
          <Container className={ styles.inner } fluid>
            <Group>
              <Link className={ styles['nav-link'] } to="/">
                <ActionIcon className={ styles.icon } variant="subtle" aria-label="Tastings">
                  <span className="iconify" data-icon="emojione-monotone:wine-glass"></span>
                </ActionIcon>
              </Link>
              <Link className={ styles['nav-link'] } to="/cellar">
                <ActionIcon className={ styles.icon } variant="subtle" aria-label="Cellar">
                  <span className="iconify" data-icon="game-icons:cellar-barrels"></span>
                </ActionIcon>
              </Link>
            </Group>
            <Group justify="flex-end">
              <Avatar component={ Link } to="/profile" color="cyan" className={ `${styles.icon} ${styles['nav-link']}` } radius="xl">{ getInitials() }</Avatar>
            </Group>
          </Container>
        ) }
    </header>
  )
}

export default NavBar
