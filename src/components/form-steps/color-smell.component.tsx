import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../features/hooks'
import { ColorT, WineT } from '../../types'
import ColorPalette from '../color-palette/color-palette.component'

export const ColorSmell = () => {
  const location = useLocation()
  const { setValue, control, formState } = useFormContext<WineT>()
  const { errors } = formState
  const { editWine } = useAppSelector((state) => state.wine)

  const color = useWatch({
    control,
    name: 'color',
    defaultValue: location.pathname === '/edit' && editWine ? editWine.color : 'red',
  })
  const hue = useWatch({
    control,
    name: 'hue',
  })
  const intensity = useWatch({
    control,
    name: 'intensity',
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <FormControl>
        <FormLabel id="color-group-label">Color</FormLabel>
        <Controller
          control={control}
          name="color"
          defaultValue="red"
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby="color-group-label"
              {...field}
              onChange={(_, val) => {
                if (val === 'red') setValue('hue', 'purple')
                else if (val === 'white') setValue('hue', 'straw')
                else if (val === 'rose') setValue('hue', 'pink')
                setValue('color', val as ColorT)
              }}
            >
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
                <FormControlLabel value="copper" label="Copper" control={<Radio />} />
              </RadioGroup>
            )}
          />
        </FormControl>
      )}
      <ColorPalette color={color} hue={hue} intensity={intensity} />
      <Controller
        name="smell"
        control={control}
        defaultValue=""
        rules={{
          required: 'Enter some descriptors of what the wine smells like',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginTop: '5px' }}
            multiline
            rows={4}
            id="smell"
            label="Smell"
            variant="outlined"
            error={!!errors.smell}
            helperText={errors.smell ? errors.smell?.message : ''}
          />
        )}
      />
    </Box>
  )
}
