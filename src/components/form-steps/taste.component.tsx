import { Box, FormControl, FormLabel, Slider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Controller, useFormContext } from 'react-hook-form'
import { WineT } from '../../types'
import { ALCOHOL_MARKS, BODY_MARKS, SWEET_MARKS, TANNIN_ACIDITY_MARKS } from '../form-wine/form-wine.constants'

const StyledSlider = styled(Slider)(() => ({
  '& .MuiSlider-markLabel': {
    fontSize: '12px',
    transform: 'rotate(-45deg)',
    marginLeft: '-20px',
  },
}))

const StyledFormControl = styled(FormControl)(() => ({
  margin: '10px',
}))

export const Taste = () => {
  const { control } = useFormContext<WineT>()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <StyledFormControl>
        <FormLabel id="body-label">Body</FormLabel>
        <Controller
          name="body"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <StyledSlider
              valueLabelDisplay="off"
              max={5}
              min={1}
              step={1}
              marks={BODY_MARKS}
              {...field}
              aria-labelledby="body-label"
            />
          )}
        />
      </StyledFormControl>
      <StyledFormControl>
        <FormLabel id="tannin-label">Tannin</FormLabel>
        <Controller
          name="tannin"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <StyledSlider
              valueLabelDisplay="off"
              max={5}
              min={1}
              step={1}
              marks={TANNIN_ACIDITY_MARKS}
              {...field}
              aria-labelledby="tannin-label"
            />
          )}
        />
      </StyledFormControl>
      <StyledFormControl>
        <FormLabel id="acidity-label">Acidity</FormLabel>
        <Controller
          name="acidity"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <StyledSlider
              valueLabelDisplay="off"
              max={5}
              min={1}
              step={1}
              marks={TANNIN_ACIDITY_MARKS}
              {...field}
              aria-labelledby="acidity-label"
            />
          )}
        />
      </StyledFormControl>
      <StyledFormControl>
        <FormLabel id="alcohol-label">Alcohol(%)</FormLabel>
        <Controller
          name="alcohol"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <StyledSlider
              valueLabelDisplay="off"
              max={5}
              min={1}
              step={1}
              marks={ALCOHOL_MARKS}
              {...field}
              aria-labelledby="alcohol-label"
            />
          )}
        />
      </StyledFormControl>
      <StyledFormControl>
        <FormLabel id="sweet-label">Sweet</FormLabel>
        <Controller
          name="sweet"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <StyledSlider
              valueLabelDisplay="off"
              max={5}
              min={1}
              step={1}
              marks={SWEET_MARKS}
              {...field}
              aria-labelledby="sweet-label"
            />
          )}
        />
      </StyledFormControl>
    </Box>
  )
}
