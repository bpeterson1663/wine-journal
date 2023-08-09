import { Button, Container, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { signUp } from 'features/auth/authSlice'
import { useAppDispatch } from 'features/hooks'
import { SignUpT } from 'types'

interface SignUpFormT extends SignUpT {
  confirmPassword: string
}

const StyledTextField = styled(TextField)({
  margin: '8px 0'
})

const SignUpForm = () => {
  const { handleSubmit, control, formState } = useForm<SignUpFormT>()
  const dispatch = useAppDispatch()
  const { errors } = formState

  const onSubmitHandler: SubmitHandler<SignUpFormT> = async data => {
    const { password, confirmPassword, email, firstName, lastName } = data
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    dispatch(signUp({ email, password, firstName, lastName }))
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
        name="firstName"
        control={ control }
        rules={ {
          required: '*Required'
        } }
        defaultValue=""
        render={ ({ field }) => (
          <StyledTextField
          { ...field }
            id="firstName"
            label="First Name"
            error={ !!errors.firstName }
            helperText={ errors.firstName ? errors.firstName?.message : '' }
          />
        ) }
      />
      <Controller
        name="lastName"
        control={ control }
        rules={ {
          required: '*Required'
        } }
        defaultValue=""
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="lastName"
            label="Last Name"
            error={ !!errors.lastName }
            helperText={ errors.lastName ? errors.lastName?.message : '' }
          />
        ) }
      />
      <Controller
        name="email"
        control={ control }
        rules={ {
          required: '*Required'
        } }
        defaultValue=""
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="email"
            type="email"
            label="Email"
            autoComplete="on"
            error={ !!errors.email }
            helperText={ errors.email ? errors.email?.message : '' }
          />
        ) }
      />
      <Controller
        name="password"
        control={ control }
        rules={ {
          required: '*Required'
        } }
        defaultValue=""
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="password"
            type="password"
            label="Password"
            error={ !!errors.password }
            helperText={ errors.password ? errors.password?.message : '' }
          />
        ) }
      />
      <Controller
        name="confirmPassword"
        control={ control }
        rules={ {
          required: '*Required'
        } }
        defaultValue=""
        render={ ({ field }) => (
          <StyledTextField
            { ...field }
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            error={ !!errors.confirmPassword }
            helperText={ errors.confirmPassword ? errors.confirmPassword?.message : '' }
          />
        ) }
      />
      <Button type="submit" variant="contained" sx={ { mt: 1, mr: 1 } }>
        Sign Up
      </Button>
    </Container>
  )
}

export default SignUpForm
