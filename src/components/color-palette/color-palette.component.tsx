import { Paper } from '@mui/material'
import { ColorT, IntensityT, RedHueT, RoseHueT, WhiteHueT } from '../../types'
import { COLOR_INDEX } from './color-palette.constant'

const ColorPalette = ({
  color,
  hue,
  intensity,
}: {
  color: ColorT
  hue: RedHueT | WhiteHueT | RoseHueT
  intensity: IntensityT
}) => {
  const backgroundColor: keyof typeof COLOR_INDEX = `${color}-${intensity}-${hue}` as keyof typeof COLOR_INDEX
  return (
    <Paper
      sx={{
        margin: '10px',
        height: 100,
        width: 92,
        borderRadius: '5% 5% 50% 50%',
        background: `radial-gradient(ellipse at bottom, ${COLOR_INDEX[backgroundColor]} 58%, #FFFFFF 71%)`,
      }}
      elevation={1}
    />
  )
}

export default ColorPalette
