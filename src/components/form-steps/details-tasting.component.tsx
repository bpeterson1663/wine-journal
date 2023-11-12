import { DatePickerInput } from '@mantine/dates'
import { Box, TextInput } from '@mantine/core'
import { WineLabelPic } from 'components/camera/camera.component'
import { useTastingContext } from 'pages/tastings/form-context'

export const DetailsTasting = () => {
  const form = useTastingContext()

  const onDateChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue('date', value)
    }
  }

  return (
    <Box>
      <DatePickerInput
        { ...form.getInputProps('date') }
        valueFormat="YYYY MMM DD"
        name="date"
        label="Date"
        onChange={ onDateChange }
      />

      <TextInput
        required
        label="Producer / Winery"
        { ...form.getInputProps('producer') }
      />

      <TextInput
        label="Classification"
        { ...form.getInputProps('classification') }
      />

      { /* <TextInput
        label="Varietal(s)"
        variant="outlined"
        { ...wineForm?.getInputProps('varietal') }
        { ...tastingForm?.getInputProps('varietal') }
      /> */ }

      <TextInput
        label="Vintage"
        { ...form.getInputProps('vintage') }
      />

      <TextInput
        label="Country"
        { ...form.getInputProps('country') }
      />

      <TextInput
        label="Region"
        { ...form.getInputProps('region') }
      />

      <TextInput
        label="Subregion"
        { ...form.getInputProps('subregion') }
      />
      <WineLabelPic value="" onChange={ () => {} } />
    </Box>
  )
}
