import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Container, TextField, Button } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../features/hooks'
import { login } from '../../features/user/userSlice'
interface SignInFormT {
  email: string
  password: string
}

const SignInForm = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<SignInFormT>()
  const { currentUser } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const onSubmitHandler: SubmitHandler<SignInFormT> = async (data) => {
    const { password, email } = data
    dispatch(login(email, password))
    if (currentUser) {
      navigate('/wines')
    }
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
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" type="email" label="Email" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" type="password" label="Password" {...field} />}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
        Submit
      </Button>
    </Container>
  )
}

export default SignInForm
