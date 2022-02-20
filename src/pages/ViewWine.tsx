import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Box, Typography, Card, CardActions, CardContent, CardHeader, Button } from '@mui/material'
import { getColorPalatte } from '../components/form-steps/form-steps.component'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { fetchWineDeleteStart, fetchWineStart } from '../features/wine/wineSlice'
import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from '../components/form-new-wine/form-new-wine.constants'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
const ViewWine = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchWineStart(id))
  }, [dispatch, id])
  const { viewWine, status, message } = useAppSelector((state) => state.wine)
  if (!viewWine) return <div>...loading</div>

  const getLabel = (type: 'BODY' | 'TANNIN' | 'ACIDITY' | 'ALCOHOL' | 'SWEET', value: number) => {
    switch (type) {
      case 'BODY':
        const body = BODY_MARKS.find((mark) => mark.value === value)
        if (body) return body.label
        break
      case 'TANNIN':
      case 'ACIDITY':
        const tanninAcidity = TANNIN_ACIDITY_MARKS.find((mark) => mark.value === value)
        if (tanninAcidity) return tanninAcidity.label
        break
      case 'ALCOHOL':
        const alcohol = ALCOHOL_MARKS.find((mark) => mark.value === value)
        if (alcohol) return alcohol.label
        break
      case 'SWEET':
        const sweet = SWEET_MARKS.find((mark) => mark.value === value)
        if (sweet) return sweet.label
        break
    }
  }
  const getRatingIcon = (rating: number): JSX.Element => {
    switch (rating * 1) {
      case 1:
        return <SentimentVeryDissatisfiedIcon fontSize="large" />
      case 2:
        return <SentimentDissatisfiedIcon fontSize="large" />
      case 3:
        return <SentimentSatisfiedIcon fontSize="large" />
      case 4:
        return <SentimentSatisfiedAltIcon fontSize="large" />
      case 5:
        return <SentimentVerySatisfiedIcon fontSize="large" />
      default:
        return <SentimentSatisfiedIcon fontSize="large" />
    }
  }

  const handleDeleteWine = () => {
    dispatch(fetchWineDeleteStart(viewWine.id))
    if (status === 'success' && message === 'Wine Deleted Successfully') {
      navigate('/wines')
    }
  }
  return (
    <Container>
      <Card sx={{ margin: '10px 0' }}>
        <CardHeader title={viewWine.producer} subheader={viewWine.date} />
        <CardContent>
          <Box>
            <Typography variant="h6" component="div">
              Details
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {viewWine.classification}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {viewWine.varietal} - {viewWine.vintage}
            </Typography>
            <Typography variant="body2">
              {viewWine.country} / {viewWine.region} / {viewWine.subregion}
            </Typography>
          </Box>
          <Box sx={{ marginTop: '4px' }}>
            <Typography variant="h6" component="div">
              Color and Smell
            </Typography>
            {getColorPalatte(viewWine.color, viewWine.hue, viewWine.intensity)}
            <Typography variant="body2">{viewWine?.smell}</Typography>
          </Box>
          <Box sx={{ marginTop: '4px' }}>
            <Typography variant="h6" component="div">
              Taste
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {getLabel('BODY', viewWine.body)} Body
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {getLabel('TANNIN', viewWine.tannin)} Tannin
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {getLabel('ACIDITY', viewWine.acidity)} Acidity
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {getLabel('ALCOHOL', viewWine.alcohol)}% Alcohol
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {getLabel('SWEET', viewWine.sweet)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" component="div">
              Remarks and Review
            </Typography>
            {getRatingIcon(viewWine.rating)}
            <Typography variant="body2">{viewWine.remarks}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button onClick={handleDeleteWine} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default ViewWine
