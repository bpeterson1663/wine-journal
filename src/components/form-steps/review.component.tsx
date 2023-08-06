import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Box, FormControl, FormLabel, IconContainerProps, Rating, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { TastingT } from '../../types'

export const Review = () => {
  const { control } = useFormContext<TastingT>()
  const customIcons: Record<string, {
    icon: React.ReactElement
    label: string
  }> = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
      label: 'Very Dissatisfied'
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize="large" />,
      label: 'Dissatisfied'
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize="large" />,
      label: 'Neutral'
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize="large" />,
      label: 'Satisfied'
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize="large" />,
      label: 'Very Satisfied'
    }
  }

  function IconContainer (props: IconContainerProps) {
    const { value, ...other } = props
    return <span { ...other }>{ customIcons[value].icon }</span>
  }

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', maxWidth: 600 } }>
      <Controller
        name="remarks"
        control={ control }
        defaultValue=""
        render={ ({ field }) => (
          <TextField multiline rows={ 4 } id="remarks" label="Remarks" variant="outlined" { ...field } />
        ) }
      />
      <FormControl>
        <FormLabel id="rating-label">Rating</FormLabel>
        <Controller
          name="rating"
          control={ control }
          defaultValue={ 3 }
          render={ ({ field }) => (
            <Rating
              { ...field }
              aria-labelledby="rating-label"
              IconContainerComponent={ IconContainer }
              highlightSelectedOnly
            />
          ) }
        />
      </FormControl>
    </Box>
  )
}
