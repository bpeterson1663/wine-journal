import { ActionIcon, Button, Container, Group } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogout } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'

import styles from 'components/nav-bar/nav-bar.module.css'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector(state => state.auth)
  const { userProfile } = useAppSelector(state => state.user)

  const handleLogout = async () => {
    await dispatch(fetchLogout(null))
    if (!currentUser) {
      navigate('/')
    }
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
              <Button variant="text" onClick={ handleLogout }>
                Sign Out
              </Button>
              { userProfile?.firstName && <span>Hello, { userProfile?.firstName }</span> }
            </Group>
          </Container>
        ) }
    </header>
  )
}

export default NavBar
