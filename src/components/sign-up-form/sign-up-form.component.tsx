import { useEffect } from 'react'
import { AuthError } from 'firebase/auth'
import { Box, TextInput, Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm, zodResolver } from '@mantine/form'
import { fetchSignUp } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { useNavigate } from 'react-router-dom'
import styles from 'components/sign-up-form/sign-up-form.module.css'
import { Schema, SignUpFormT } from 'components/sign-up-form/scehma'
import { createUserProfile } from 'features/user/userSlice'
import { generateAuthErrorMessage } from 'helpers'

const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(Schema),
  })

  const onSubmitHandler = async (data: SignUpFormT) => {
    const { password, email, firstName, lastName } = data
    try {
      const { uid } = await dispatch(fetchSignUp({ email, password, firstName, lastName })).unwrap()
      await dispatch(
        createUserProfile({ firstName, lastName, userId: uid, email, displayName: '', avatar: '', id: '' }),
      ).unwrap()
    } catch (err) {
      notifications.show({
        color: 'red',
        message: generateAuthErrorMessage(err as AuthError),
      })
    }
  }

  return (
    <Box className={styles.container}>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <TextInput withAsterisk label="First Name" type="text" {...form.getInputProps('firstName')} />

        <TextInput withAsterisk label="Last Name" type="text" {...form.getInputProps('lastName')} />

        <TextInput withAsterisk label="Email" type="email" {...form.getInputProps('email')} />

        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps('password')} />

        <TextInput withAsterisk label="Confirm Password" type="password" {...form.getInputProps('confirmPassword')} />
        <Group justify="flex-end" mt="md">
          <Button type="submit">
            Sign Up
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignUpForm
