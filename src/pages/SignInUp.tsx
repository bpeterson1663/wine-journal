import { useState } from 'react'
import { Title } from '@mantine/core'

import Footer from 'components/footer/footer.component'
import SignInForm from 'components/sign-in-form/sign-in-form.component'
import SignUpForm from 'components/sign-up-form/sign-up-form.component'
import styles from 'pages/styles/pages.module.css'

const SignInUp = () => {
  const [showSignIn, setShowSignIn] = useState(true)

  return (
    <main>
      <Title order={1} style={{ fontSize: '2rem' }}>
        Wine Journal
      </Title>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
        }}
      >
        {showSignIn ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 500,
            }}
          >
            <Title order={2} style={{ fontSize: '1.5rem' }}>
              Sign In
            </Title>
            <SignInForm />
            <div className={styles['action-container']}>
              Dont have an account yet?&nbsp;
              <span
                className={styles['click-here']}
                onClick={() => {
                  setShowSignIn(false)
                }}
              >
                {' '}
                Click Here
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 500,
            }}
          >
            <Title order={2} style={{ fontSize: '1.5rem' }}>
              Sign Up
            </Title>
            <SignUpForm />
            <div className={styles['action-container']}>
              Already have an account?&nbsp;
              <span
                className={styles['click-here']}
                onClick={() => {
                  setShowSignIn(true)
                }}
              >
                {' '}
                Click Here
              </span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

export default SignInUp
