import { useState } from 'react'
import { DatePickerInput } from '@mantine/dates'
import { Box, TextInput, Group } from '@mantine/core'
import { WineLabelPic } from 'components/camera/camera.component'
import { useWineContext } from 'pages/cellar/form-context'

export const DetailsWine = () => {
  const [img, setImg] = useState('')
  const form = useWineContext()

  const onDateChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue('date', value)
    }
  }

  const onCameraChange = (value: string) => {
    form.setFieldValue('labelUri', value)
    setImg(value)
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
      <Group justify="center" mt="md">
        <WineLabelPic value={ img } onChange={ onCameraChange } />
      </Group>
    </Box>
  )
}
