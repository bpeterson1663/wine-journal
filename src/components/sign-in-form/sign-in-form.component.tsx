import { Button, Container, TextField, Snackbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login, signInWithGoogle } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

interface SignInFormT {
  email: string
  password: string
}

const StyledTextField = styled(TextField)({
  margin: '8px 0'
})

const SignInForm = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { handleSubmit, control, formState } = useForm<SignInFormT>()
  const { currentUser, message, status } = useAppSelector(state => state.auth)
  const { errors } = formState

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const onSubmitHandler: SubmitHandler<SignInFormT> = async data => {
    const { password, email } = data
    dispatch(login(email, password))
    setOpen(true)
    setTimeout(() => { setOpen(false) }, 5000)
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
  })

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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
      { message && <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
        <Alert onClose={ handleClose } severity={ status === 'success' ? 'success' : 'error' } sx={ { width: '100%' } }>
          { message }
        </Alert>
      </Snackbar> }
      <Button sx={ { marginTop: '10px', marginBottom: '20px' } } variant="contained" color="primary" onClick={ () => { dispatch(signInWithGoogle()) } }>Sign In With Google</Button>
      <Controller
        name="email"
        control={ control }
        defaultValue=""
        rules={ {
          required: '*Required'
        } }
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="signInEmail"
            type="email"
            label="Email"
            error={ !!errors.email }
            helperText={ errors.email ? errors.email?.message : '' }
          />
        ) }
      />
      <Controller
        name="password"
        control={ control }
        defaultValue=""
        rules={ {
          required: '*Required'
        } }
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="signInPassword"
            autoComplete="on"
            type="password"
            label="Password"
            error={ !!errors.password }
            helperText={ errors.password ? errors.password?.message : '' } />
        ) }
      />
      <Button type="submit" variant="contained" sx={ { mt: 1, mr: 1 } }>
        Submit
      </Button>
    </Container>
  )
}

export default SignInForm
