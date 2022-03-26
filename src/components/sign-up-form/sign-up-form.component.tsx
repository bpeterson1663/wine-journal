import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Container, TextField, Button } from '@mui/material'
import { SignUpT } from '../../types'
import { useAppDispatch } from '../../features/hooks'
import { signUp } from '../../features/auth/authSlice'
interface SignUpFormT extends SignUpT {
  confirmPassword: string
}

const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUpFormT>()
  const dispatch = useAppDispatch()

  const onSubmitHandler: SubmitHandler<SignUpFormT> = async (data) => {
    const { password, confirmPassword, email, firstName, lastName } = data
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    dispatch(signUp({ email, password, firstName, lastName }))
  }
  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        maxWidth: 600,
        width: '90%',
      }}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="firstName" label="First Name" {...field} />}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="lastName" label="Last Name" {...field} />}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="email" type="email" label="Email" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField autoComplete="on" id="password" type="password" label="Password" {...field} />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField autoComplete="on" id="confirmPassword" type="password" label="Confirm Password" {...field} />
        )}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
        Submit
      </Button>
    </Container>
  )
}

export default SignUpForm
