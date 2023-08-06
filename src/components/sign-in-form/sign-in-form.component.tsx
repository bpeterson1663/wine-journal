import { Button, Container, TextField } from '@mui/material'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login, signInWithGoogle } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../features/hooks'

interface SignInFormT {
  email: string
  password: string
}

const SignInForm = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<SignInFormT>()
  const { currentUser } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const onSubmitHandler: SubmitHandler<SignInFormT> = async data => {
    const { password, email } = data
    dispatch(login(email, password))
  }

  return (
    <Container
      sx={ {
        display: 'flex',
        flexFlow: 'column wrap',
        maxWidth: 600,
        width: '90%'
      } }
      component="form"
      onSubmit={ handleSubmit(onSubmitHandler) }
    >
      <Controller
        name="email"
        control={ control }
        defaultValue=""
        render={ ({ field }) => <TextField id="signInEmail" type="email" label="Email" { ...field } /> }
      />
      <Controller
        name="password"
        control={ control }
        defaultValue=""
        render={ ({ field }) => (
          <TextField id="signInPassword" autoComplete="on" type="password" label="Password" { ...field } />
        ) }
      />
      <Button type="submit" variant="contained" sx={ { mt: 1, mr: 1 } }>
        Submit
      </Button>
      <Button onClick={ () => { dispatch(signInWithGoogle()) } }>Sign In With Google</Button>
    </Container>
  )
}

export default SignInForm
