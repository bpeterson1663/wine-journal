import { DatePickerInput } from '@mantine/dates'
import { Box, TextInput } from '@mantine/core'
// import { TastingFormT } from 'types'
import { WineLabelPic } from 'components/camera/camera.component'

export const Details = () => {
  return (
    <Box>
      <DatePickerInput
        name="date"
        label="Date"
      />

      <TextInput
        required
        label="Producer / Winery"
        variant="outlined"
      />

      <TextInput
        required
        label="Classification"
        variant="outlined"
      />

      <TextInput
        required
        label="Varietal(s)"
        variant="outlined"
      />

      <TextInput
        required
        label="Vintage"
        variant="outlined"
      />

      <TextInput
        required
        label="Country"
        variant="outlined"
      />

      <TextInput
        required
        label="Region"
        variant="outlined"
      />

      <TextInput
        required
        label="Subregion"
        variant="outlined"
      />
      <WineLabelPic value="" onChange={ () => {} } />
    </Box>
  )
}
