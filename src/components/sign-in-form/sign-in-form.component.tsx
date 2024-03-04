import { useEffect } from 'react'
import { AuthError } from 'firebase/auth'
import { Button, Box, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { fetchLogin, fetchSignInWithGoogle } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import styles from 'components/sign-in-form/sign-in-form.module.css'
import { Schema, SignInFormT } from 'components/sign-in-form/scema'
import { generateAuthErrorMessage } from 'helpers'

const SignInForm = () => {
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const onSubmitHandler = async (data: SignInFormT) => {
    const { password, email } = data
    try {
      await dispatch(fetchLogin({ email, password })).unwrap()
    } catch (err) {
      console.error(err)
      notifications.show({
        color: 'red',
        message: generateAuthErrorMessage(err as AuthError),
      })
    }
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: zodResolver(Schema),
  })

  const handleSignInWithGoogle = async () => {
    try {
      await dispatch(fetchSignInWithGoogle(null))
    } catch (err) {
      console.error(err)
      notifications.show({
        message: generateAuthErrorMessage(err as AuthError),
      })
    }
  }

  return (
    <Box className={styles.container}>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <TextInput
          withAsterisk
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps('password')} />

        <Group justify="center" mt="md">
          <Button onClick={handleSignInWithGoogle}>
            Sign In With Google
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignInForm
