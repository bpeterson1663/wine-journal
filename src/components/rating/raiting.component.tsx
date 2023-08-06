import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

type FontSizeT = 'large' | 'medium' | 'small'
const RatingIcon = ({ rating, fontSize = 'large' }: { rating: number, fontSize?: FontSizeT }) => {
  switch (rating * 1) {
    case 1:
      return <SentimentVeryDissatisfiedIcon fontSize={ fontSize } />
    case 2:
      return <SentimentDissatisfiedIcon fontSize={ fontSize } />
    case 3:
      return <SentimentSatisfiedIcon fontSize={ fontSize } />
    case 4:
      return <SentimentSatisfiedAltIcon fontSize={ fontSize } />
    case 5:
      return <SentimentVerySatisfiedIcon fontSize={ fontSize } />
    default:
      return <SentimentSatisfiedIcon fontSize={ fontSize } />
  }
}

export default RatingIcon
