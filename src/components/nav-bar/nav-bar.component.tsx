import { Avatar, Button, Container, Group } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'features/hooks'

import styles from 'components/nav-bar/nav-bar.module.css'

const NavBar = () => {
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)
  const { userProfile } = useAppSelector((state) => state.user)

  function getInitials() {
    const first = userProfile?.firstName[0] ?? ''
    const last = userProfile?.lastName[0] ?? ''
    return `${first}${last}`
  }

  function handleNavigate(url: string) {
    navigate(url)
  }

  return (
    <header className={styles['nav-bar']}>
      {currentUser && (
        <Container className={styles.inner} fluid>
          <Group>
            <Button onClick={() => handleNavigate("/")}>
              Home
            </Button>
            <Button onClick={() => handleNavigate("/tastings")}>
              Tastings
            </Button>
            <Button onClick={() => handleNavigate("/cellar")}>
              Cellar
            </Button>
          </Group>
          <Group justify="flex-end">
            <Avatar
              color="white"
              component={Link}
              to="/profile"
              className={`${styles.icon} ${styles['nav-link']}`}
              radius="xl"
            >
              {getInitials()}
            </Avatar>
          </Group>
        </Container>
      )}
    </header>
  )
}

export default NavBar
