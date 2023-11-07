import { useEffect } from 'react'
import { Box, TextInput, Button, Group } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { signUp } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { useNavigate } from 'react-router-dom'
import styles from 'components/sign-up-form/sign-up-form.module.css'
import { Schema, SignUpFormT } from 'components/sign-up-form/scehma'

const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector(state => state.auth)

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
      confirmPassword: ''
    },

    validate: zodResolver(Schema)
  })

  const onSubmitHandler = (data: SignUpFormT) => {
    const { password, email, firstName, lastName } = data
    dispatch(signUp({ email, password, firstName, lastName }))
  }

  return (
    <Box className={ styles.container }>
      <form onSubmit={ form.onSubmit(values => { onSubmitHandler(values) }) }>
        <TextInput
          withAsterisk
          label="First Name"
          type="text"
          { ...form.getInputProps('firstName') }
        />

        <TextInput
          withAsterisk
          label="Last Name"
          type="text"
          { ...form.getInputProps('lastName') }
        />

        <TextInput
          withAsterisk
          label="Email"
          type="email"
          { ...form.getInputProps('email') }
        />

        <TextInput
          withAsterisk
          label="Password"
          type="password"
          { ...form.getInputProps('password') }
        />

        <TextInput
          withAsterisk
          label="Confirm Password"
          type="password"
          { ...form.getInputProps('confirmPassword') }
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignUpForm
