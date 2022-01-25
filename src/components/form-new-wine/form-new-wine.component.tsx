import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container } from '@mui/material'
import { WineT } from '../../types'
import { addWineEntry } from '../../api'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const FormNewWine = () => {
  const { handleSubmit, control, watch } = useForm<WineT>({
    defaultValues: { color: 'red', intensity: 'pale', hue: 'purple' },
  })
  const onSubmitHandler: SubmitHandler<WineT> = async (data) => {
    console.log(data)
    const response = await addWineEntry(data)
    console.log('response: ', response)
  }
  const color = watch('color')
  console.log('color: ', color)
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
        name="date"
        defaultValue={`${new Date().toISOString().split('T')[0]}`}
        control={control}
        render={({ field }) => <TextField type="date" label="Date" {...field} />}
      />
      <Controller
        name="producer"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Producer" variant="outlined" {...field} />}
      />
      <Controller
        name="classification"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Classification" variant="outlined" {...field} />}
      />
      <Controller
        name="variety"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Variety(ies)" variant="outlined" {...field} />}
      />
      <Controller
        name="subregion"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Subregion" variant="outlined" {...field} />}
      />
      <Controller
        name="region"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Region" variant="outlined" {...field} />}
      />
      <Controller
        name="country"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Country" variant="outlined" {...field} />}
      />
      <Controller
        name="vintage"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Vintage" variant="outlined" {...field} />}
      />
      <FormControl>
        <FormLabel id="color-group-label">Color</FormLabel>
        <Controller
          control={control}
          name="color"
          defaultValue="red"
          render={({ field }) => (
            <RadioGroup row aria-labelledby="color-group-label" {...field}>
              <FormControlLabel value="red" label="Red" control={<Radio />} />
              <FormControlLabel value="white" label="White" control={<Radio />} />
              <FormControlLabel value="rose" label="Rosé" control={<Radio />} />
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel id="intensity-group-label">Intensity</FormLabel>
        <Controller
          control={control}
          name="intensity"
          defaultValue="pale"
          render={({ field }) => (
            <RadioGroup row aria-labelledby="intensity-group-label" {...field}>
              <FormControlLabel value="pale" label="Pale" control={<Radio />} />
              <FormControlLabel value="medium" label="Medium" control={<Radio />} />
              <FormControlLabel value="deep" label="Deep" control={<Radio />} />
            </RadioGroup>
          )}
        />
      </FormControl>
      {color === 'red' && (
        <FormControl>
          <FormLabel id="hue-group-label">Hue</FormLabel>
          <Controller
            control={control}
            name="hue"
            defaultValue="purple"
            render={({ field }) => (
              <RadioGroup row aria-labelledby="hue-group-label" {...field}>
                <FormControlLabel value="purple" label="Purple" control={<Radio />} />
                <FormControlLabel value="ruby" label="Ruby" control={<Radio />} />
                <FormControlLabel value="garnet" label="Garnet" control={<Radio />} />
                <FormControlLabel value="tawny" label="Tawny" control={<Radio />} />
                <FormControlLabel value="brown" label="Brown" control={<Radio />} />
              </RadioGroup>
            )}
          />
        </FormControl>
      )}
      {color === 'white' && (
        <FormControl>
          <FormLabel id="hue-group-label">Hue</FormLabel>
          <Controller
            control={control}
            name="hue"
            defaultValue="straw"
            render={({ field }) => (
              <RadioGroup row aria-labelledby="hue-group-label" {...field}>
                <FormControlLabel value="straw" label="Straw" control={<Radio />} />
                <FormControlLabel value="yellow" label="Yellow" control={<Radio />} />
                <FormControlLabel value="gold" label="Gold" control={<Radio />} />
                <FormControlLabel value="amber" label="Amber" control={<Radio />} />
                <FormControlLabel value="brown" label="Brown" control={<Radio />} />
              </RadioGroup>
            )}
          />
        </FormControl>
      )}
      {color === 'rose' && (
        <FormControl>
          <FormLabel id="hue-group-label">Hue</FormLabel>
          <Controller
            control={control}
            name="hue"
            defaultValue="pink"
            render={({ field }) => (
              <RadioGroup row aria-labelledby="hue-group-label" {...field}>
                <FormControlLabel value="pink" label="Pink" control={<Radio />} />
                <FormControlLabel value="salmon" label="Salmon" control={<Radio />} />
                <FormControlLabel value="Copper" label="Copper" control={<Radio />} />
              </RadioGroup>
            )}
          />
        </FormControl>
      )}
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
