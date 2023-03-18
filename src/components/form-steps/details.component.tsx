import { Autocomplete, Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Controller, useFormContext } from 'react-hook-form'
import { useAppSelector } from '../../features/hooks'
import { TastingFormT } from '../../types'
import { WineLabelPic } from '../camera/camera.component'

const StyledTextField = styled(TextField)({
  margin: '5px 0',
})

export const Details = () => {
  const { varietalList } = useAppSelector((state) => state.varietal)
  const { formState, control, setValue } = useFormContext<TastingFormT>()
  const { errors } = formState
  const varietals: string[] = []

  varietalList.forEach((varietal) => varietals.push(varietal.name))
  varietals.sort((a, b) => a.localeCompare(b))
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Controller
        name="date"
        defaultValue={`${new Date().toISOString().split('T')[0]}`}
        control={control}
        rules={{
          required: 'Enter a date',
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="date"
            type="date"
            label="Date"
            error={!!errors.date}
            helperText={errors.date ? errors.date?.message : ''}
          />
        )}
      />
      <Controller
        name="producer"
        control={control}
        defaultValue=""
        rules={{
          required: 'The producer is required',
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="producer"
            label="Producer / Winery"
            variant="outlined"
            error={!!errors.producer}
            helperText={errors.producer ? errors.producer?.message : ''}
          />
        )}
      />
      <Controller
        name="classification"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField {...field} id="classification" label="Classification / Name" variant="outlined" />
        )}
      />
      <Controller
        name="varietal"
        control={control}
        defaultValue={[]}
        rules={{
          required: 'At least one varietal is required',
        }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            defaultValue={[]}
            multiple
            freeSolo
            filterSelectedOptions
            options={varietals}
            onChange={(_, option) => setValue('varietal', option)}
            getOptionLabel={(option: string) => option}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                id="varietal"
                label="Varietal(s)"
                error={!!errors.varietal}
                helperText={errors.varietal ? errors.varietal?.message : ''}
              />
            )}
          />
        )}
      />
      <Controller
        name="vintage"
        control={control}
        defaultValue=""
        rules={{
          required: 'Enter the vintage of the wine or N/V if non vintage',
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="vinatge"
            label="Vintage"
            variant="outlined"
            error={!!errors.vintage}
            helperText={errors.vintage ? errors.vintage?.message : ''}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        defaultValue=""
        rules={{
          required: 'Enter the country the wine is from',
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="country"
            label="Country"
            variant="outlined"
            error={!!errors.country}
            helperText={errors.country ? errors.country?.message : ''}
          />
        )}
      />
      <Controller
        name="region"
        control={control}
        defaultValue=""
        rules={{
          required: 'Enter the region the wine is from',
        }}
        render={({ field }) => (
          <StyledTextField
            {...field}
            id="region"
            label="Region"
            variant="outlined"
            error={!!errors.region}
            helperText={errors.region ? errors.region?.message : ''}
          />
        )}
      />
      <Controller
        name="subregion"
        control={control}
        defaultValue=""
        render={({ field }) => <StyledTextField {...field} id="subregion" label="Subregion" variant="outlined" />}
      />
      <Controller name="labelUri" control={control} render={({ field }) => <WineLabelPic {...field} />} />
    </Box>
  )
}
