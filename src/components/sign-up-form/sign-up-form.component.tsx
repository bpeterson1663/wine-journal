import { Box, TextInput, Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { signUp } from 'features/auth/authSlice'
import { useAppDispatch } from 'features/hooks'
import { SignUpT } from 'types'
import styles from 'components/sign-up-form/sign-up-form.module.css'

interface SignUpFormT extends SignUpT {
  confirmPassword: string
}

const SignUpForm = () => {
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const onSubmitHandler = (data: SignUpFormT) => {
    const { password, confirmPassword, email, firstName, lastName } = data
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    dispatch(signUp({ email, password, firstName, lastName }))
  }

  return (
    <Box className={ styles.container }>
      <form onSubmit={ form.onSubmit(values => { onSubmitHandler(values) }) }>
        <TextInput
          required
          label="First Name"
          type="text"
          { ...form.getInputProps('firstName') }
        />

        <TextInput
          required
          label="Last Name"
          type="text"
          { ...form.getInputProps('lastName') }
        />

        <TextInput
          required
          label="Email"
          type="email"
          { ...form.getInputProps('email') }
        />

        <TextInput
          required
          label="Password"
          type="password"
          { ...form.getInputProps('password') }
        />

        <TextInput
          required
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
