import { ALCOHOL_MARKS, BODY_MARKS, SWEET_MARKS, TANNIN_ACIDITY_MARKS } from '../form-tasting/form-tasting.constants'
import { Box, Slider, Text } from '@mantine/core'

export const Taste = () => {
  return (
    <Box>
        <Text size="sm" mt="xl">Body</Text>
        <Slider
          labelAlwaysOn
          max={ 5 }
          min={ 1 }
          step={ 1 }
          marks={ BODY_MARKS }
          aria-labelledby="body-label"
        />

        <Text id="tannin-label">Tannin</Text>
        <Slider
          labelAlwaysOn
          max={ 5 }
          min={ 1 }
          step={ 1 }
          marks={ TANNIN_ACIDITY_MARKS }
          aria-labelledby="tannin-label"
        />

        <Text id="acidity-label">Acidity</Text>
        <Slider
          labelAlwaysOn
          max={ 5 }
          min={ 1 }
          step={ 1 }
          marks={ TANNIN_ACIDITY_MARKS }
          aria-labelledby="acidity-label"
        />

        <Text id="alcohol-label">Alcohol(%)</Text>
        <Slider
          labelAlwaysOn
          max={ 5 }
          min={ 1 }
          step={ 1 }
          marks={ ALCOHOL_MARKS }
          aria-labelledby="alcohol-label"
        />

        <Text id="sweet-label">Sweetness</Text>
        <Slider
          labelAlwaysOn
          max={ 5 }
          min={ 1 }
          step={ 1 }
          marks={ SWEET_MARKS }
          aria-labelledby="sweet-label"
        />
    </Box>
  )
}
