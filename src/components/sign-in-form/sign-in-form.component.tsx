import { useEffect } from 'react'
import { Button, Box, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { login, signInWithGoogle } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import styles from 'components/sign-in-form/sign-in-form.module.css'

interface SignInFormT {
  email: string
  password: string
}

const SignInForm = () => {
  const navigate = useNavigate()
  const { currentUser } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const onSubmitHandler = (data: SignInFormT) => {
    const { password, email } = data
    dispatch(login(email, password))
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  return (
    <Box className={ styles.container }>
      <form onSubmit={ form.onSubmit(values => { onSubmitHandler(values) }) }>
        <TextInput
          required
          type="email"
          label="Email"
          placeholder="your@email.com"
          { ...form.getInputProps('email') }
        />

        <TextInput
          required
          label="Password"
          type="password"
          { ...form.getInputProps('password') }
        />

        <Group justify="flex-end" mt="md">
          <Button mt="10px" mb="20px" variant="contained" color="primary" onClick={ () => { dispatch(signInWithGoogle()) } }>Sign In With Google</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignInForm
