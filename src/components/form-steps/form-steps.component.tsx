import React from 'react'
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  IconContainerProps,
  Rating,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Control, Controller, useWatch, UseFormSetValue } from 'react-hook-form'
import { WineT, ColorT, IntensityT, RedHueT, WhiteHueT, RoseHueT } from '../../types'
import { BODY_MARKS, TANNIN_ACIDITY_MARKS, ALCOHOL_MARKS, SWEET_MARKS } from '../form-new-wine/form-new-wine.constants'
import { COLOR_INDEX } from './form-steps.constants'

export const FormDetails = ({ control }: { control: Control<WineT> }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
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
        name="varietal"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="outlined-basic" label="Varietal(s)" variant="outlined" {...field} />}
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
    </Box>
  )
}

export const getColorPalatte = (color: ColorT, hue: RedHueT | WhiteHueT | RoseHueT, intensity: IntensityT) => {
  const backgroundColor: keyof typeof COLOR_INDEX = `${color}-${intensity}-${hue}` as keyof typeof COLOR_INDEX
  return (
    <Paper
      sx={{
        margin: '0 auto',
        height: 100,
        width: 92,
        borderRadius: '5% 5% 50% 50%',
        background: `radial-gradient(ellipse at bottom, ${COLOR_INDEX[backgroundColor]} 58%, #FFFFFF 71%)`,
      }}
      elevation={1}
    />
  )
}
export const FormColorSmell = ({
  control,
  setValue,
}: {
  control: Control<WineT>
  setValue: UseFormSetValue<WineT>
}) => {
  const color = useWatch({
    control,
    name: 'color',
    defaultValue: 'red',
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
      {getColorPalatte(color, hue, intensity)}
      <Controller
        name="smell"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField multiline rows={4} id="outlined-basic" label="Smell" variant="outlined" {...field} />
        )}
      />
    </Box>
  )
}
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

export const FormTaste = ({ control }: { control: Control<WineT> }) => {
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

export const FormReview = ({ control }: { control: Control<WineT> }) => {
  const customIcons: {
    [index: string]: {
      icon: React.ReactElement
      label: string
    }
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize="large" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize="large" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize="large" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize="large" />,
      label: 'Very Satisfied',
    },
  }

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props
    return <span {...other}>{customIcons[value].icon}</span>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Controller
        name="remarks"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField multiline rows={4} id="outlined-basic" label="Remarks" variant="outlined" {...field} />
        )}
      />
      <FormControl>
        <FormLabel id="rating-label">Rating</FormLabel>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Rating
              aria-labelledby="rating-label"
              defaultValue={3}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              {...field}
            />
          )}
        />
      </FormControl>
    </Box>
  )
}