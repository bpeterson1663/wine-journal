import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container } from '@mui/material'
import { WineT } from '../../types'
import { addWineEntry } from '../../api'

const FormNewWine = () => {
  const { handleSubmit, control } = useForm<WineT>()
  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    const response = await addWineEntry(data)
    console.log('response: ', response)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column wrap',
        maxWidth: 600,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Controller
        name="producer"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Producer" variant="outlined" {...field} />}
      />
      <Controller
        name="smell"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField multiline rows={4} id="outlined-basic" label="Smell" variant="outlined" {...field} />
        )}
      />
      <Button type="submit">Submit</Button>
    </Container>
  )
}

export default FormNewWine
