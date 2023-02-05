import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Controller, useFormContext } from 'react-hook-form'
import { WineFormT } from '../../types'

const StyledTextField = styled(TextField)({
  margin: '5px 0',
})

export const Quantity = () => {
  const { formState, control } = useFormContext<WineFormT>()
  const { errors } = formState

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Controller
        name="quantity"
        defaultValue={0}
        control={control}
        rules={{
          required: 'Please enter number of bottles',
          min: 0,
          max: 1000,
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="quantity"
            type="number"
            label="Quantity"
            error={!!errors.quantity}
            helperText={errors.quantity ? errors.quantity?.message : ''}
          />
        )}
      />
      <Controller
        name="price"
        defaultValue={0}
        control={control}
        rules={{
          required: 'Please enter a price',
          min: 0,
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="price"
            type="number"
            label="Price"
            error={!!errors.price}
            helperText={errors.price ? errors.price?.message : ''}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField multiline rows={4} id="description" label="Description" variant="outlined" {...field} />
        )}
      />
    </Box>
  )
}
