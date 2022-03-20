import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ColorPalette from '../components/color-palette/color-palette.component'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { fetchWineDeleteStart, fetchWineStart } from '../features/wine/wineSlice'
import RatingIcon from '../components/rating/raiting.component'
import { getLabel } from '../helpers'

const ViewWine = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  useEffect(() => {
    dispatch(fetchWineStart(id))
  }, [dispatch, id])
  const { viewWine, status } = useAppSelector((state) => state.wine)
  if (!viewWine) return <div>...loading</div>

  const handleDeleteWine = () => {
    dispatch(fetchWineDeleteStart(viewWine.id))
    if (status === 'success') {
      navigate('/wines')
    }
  }
  const handleConfirmDeleteClose = () => {
    setIsConfirmOpen(false)
  }
  const ConfirmDeleteDialog = () => (
    <Dialog open={isConfirmOpen} onClose={handleConfirmDeleteClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete Wine</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this wine?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirmDeleteClose}>
          Cancel
        </Button>
        <Button onClick={handleDeleteWine} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
  return (
    <Container>
      <ConfirmDeleteDialog />
      <Card sx={{ margin: '10px auto', maxWidth: 400 }}>
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
              {viewWine.vintage} - {viewWine.varietal.map((item, i) => `${item}`).join(', ')}
            </Typography>
            <Typography variant="body2">
              {viewWine.country} / {viewWine.region} {viewWine.subregion && `/ ${viewWine.subregion}`}
            </Typography>
          </Box>
          <Box sx={{ marginTop: '4px' }}>
            <Typography variant="h6" component="div">
              Color and Smell
            </Typography>
            <ColorPalette color={viewWine.color} hue={viewWine.hue} intensity={viewWine.intensity} />
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
            <RatingIcon rating={viewWine.rating} />
            <Typography variant="body2">{viewWine.remarks}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <IconButton onClick={() => setIsConfirmOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  )
}

export default ViewWine
