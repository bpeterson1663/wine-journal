import { Box, TextInput, Textarea } from '@mantine/core'

export const Quantity = () => {
  return (
    <Box >
      <TextInput
        type="number"
        label="Quantity"
      />
      <TextInput
        type="number"
        label="Price"
      />
      <Textarea
        multiline
        rows={ 4 }
        id="description"
        label="Description"
        variant="outlined"/>
    </Box>
  )
}
