import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { DatePickerInput } from '@mantine/dates'
import { Box, TextInput, Group, PillsInput, Pill } from '@mantine/core'
import { WineLabelPic } from 'components/camera/camera.component'
import { useWineContext } from 'pages/cellar/form-context'

export const DetailsWine = () => {
  const [img, setImg] = useState('')
  const [varietals, setVarietals] = useState([''])
  const [currentVarietal, setCurrentVarietal] = useState('')

  const form = useWineContext()

  useEffect(() => {
    setImg(form.values.labelUri)
    setVarietals(form.values.varietal)
  }, [form])

  const handleRemove = (val: string) => {
    form.setFieldValue(
      'varietal',
      varietals.filter((varietal) => varietal !== val),
    )
    setVarietals(varietals.filter((varietal) => varietal !== val))
  }

  const onDateChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue('date', value)
    }
  }

  const onVarietalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setVarietals([...varietals, currentVarietal])
      form.setFieldValue('varietal', [...varietals, currentVarietal])
      setCurrentVarietal('')
    }
  }

  const onVarietalChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setCurrentVarietal(event.currentTarget.value)
  }

  const onCameraChange = (value: string) => {
    form.setFieldValue('labelUri', value)
    setImg(value)
  }

  return (
    <Box>
      <DatePickerInput
        {...form.getInputProps('date')}
        valueFormat="YYYY MMM DD"
        name="date"
        label="Date"
        onChange={onDateChange}
      />

      <TextInput label="Producer / Winery" {...form.getInputProps('producer')} />

      <TextInput label="Classification" {...form.getInputProps('classification')} />

      <PillsInput label="Varietal(s)" {...form.getInputProps('varietal')}>
        <Pill.Group>
          {varietals.map((varietal) => (
            <Pill
              key={varietal}
              onRemove={() => {
                handleRemove(varietal)
              }}
              withRemoveButton
            >
              {' '}
              {varietal}
            </Pill>
          ))}
          <PillsInput.Field
            value={currentVarietal}
            onKeyDown={onVarietalKeyDown}
            onChange={onVarietalChange}
            placeholder="Enter Varietal"
          />
        </Pill.Group>
      </PillsInput>

      <TextInput label="Vintage" {...form.getInputProps('vintage')} />

      <TextInput label="Country" {...form.getInputProps('country')} />

      <TextInput label="Region" {...form.getInputProps('region')} />

      <TextInput label="Subregion" {...form.getInputProps('subregion')} />
      <Group justify="center" mt="md">
        <WineLabelPic value={img} onChange={onCameraChange} />
      </Group>
    </Box>
  )
}
