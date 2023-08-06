import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import ColorPalette from 'components/color-palette/color-palette.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { selectTastingById } from 'features/tasting/tastingSelectors'
import { fetchTastingDeleteStart, tastingSetEdit } from 'features/tasting/tastingSlice'
import { getLabel, uppercaseFirstLetter } from 'helpers'
import styles from 'pages/styles/pages.module.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import RatingIcon from 'components/rating/raiting.component'

import PageContainer from 'components/page-container/page-container.component'
import { TastingT } from 'types'

export default function TastingId () {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = params.id ?? ''
  const tasting = useAppSelector(selectTastingById(id))
  const [itemToDelete, setItemToDelete] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { status } = useAppSelector(state => state.tasting)

  if (!tasting) {
    navigate('/')
    return null
  }

  const handleConfirmDeleteOpen = (id: string) => {
    setItemToDelete(id)
    setIsConfirmOpen(true)
  }

  const handleConfirmDeleteClose = () => {
    setItemToDelete('')
    setIsConfirmOpen(false)
  }

  const handleDelete = () => {
    dispatch(fetchTastingDeleteStart(itemToDelete))
    if (status === 'success') {
      navigate('/')
    }
  }

  const handleEditClick = (wine: TastingT) => {
    dispatch(tastingSetEdit(wine))
    navigate('/tastings/edit')
  }

  const ConfirmDeleteDialog = () => (
    <Dialog open={ isConfirmOpen } onClose={ handleConfirmDeleteClose } aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete Tasting</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this tasting?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={ handleConfirmDeleteClose }>
          Cancel
        </Button>
        <Button onClick={ handleDelete } autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" variant="contained" sx={ { mt: 1, mr: 1 } } onClick={ () => { handleEditClick(tasting) } }>
        Edit
      </Button>
      <Button color="info" onClick={ () => { handleConfirmDeleteOpen(tasting.id) } } variant="outlined" sx={ { mt: 1, mr: 1 } }>
        Delete
      </Button>
    </div>
  )

  const {
    producer,
    labelUri,
    varietal,
    vintage,
    region,
    country,
    subregion,
    classification,
    color,
    hue,
    intensity,
    smell,
    body,
    tannin,
    acidity,
    alcohol,
    sweet,
    rating,
    remarks
  } = tasting

  return (
    <PageContainer title={ producer } actions={ <Actions /> }>
      <section className={ styles.container }>
        <div className={ styles.column }>
          <img className={ styles.wineImage } src={ labelUri || require('images/wine-tasting.jpg') } alt={ producer } />
        </div>
        <div className={ styles.column }>
          { producer && <Typography variant="h6">Winery: { producer }</Typography> }
          { classification && <Typography variant="h6">Name: { classification }</Typography> }
          <Typography variant="subtitle1">Varietal(s): { varietal.join(', ') }</Typography>
          <Typography variant="subtitle1">Vintage: { vintage }</Typography>
          <Typography variant="subtitle1">Country: { country }</Typography>

          <Typography variant="subtitle1">Region: { region }</Typography>
          { subregion && <Typography variant="subtitle1">Subregion: { subregion }</Typography> }
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            { uppercaseFirstLetter(color) } / { uppercaseFirstLetter(intensity) } / { uppercaseFirstLetter(hue) }
          </Typography>
          <ColorPalette color={ color } hue={ hue } intensity={ intensity } />
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            { smell }
          </Typography>
        </div>
        <div className={ styles.column }>
          <Typography variant="h6" component="div">
            Taste
          </Typography>
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            Body: { getLabel('BODY', body) }
          </Typography>
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            Tannin: { getLabel('TANNIN', tannin) }
          </Typography>
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            Acidity: { getLabel('ACIDITY', acidity) }
          </Typography>
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            Alcohol: { getLabel('ALCOHOL', alcohol) }%
          </Typography>
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            Sweetness: { getLabel('SWEET', sweet) }
          </Typography>
          <Typography variant="h6" component="div">
            Remarks and Review
          </Typography>
          <RatingIcon rating={ rating } />
          <Typography variant="body2" sx={ { mb: 1.5 } } color="text.secondary">
            { remarks }
          </Typography>
        </div>
      </section>
      <ConfirmDeleteDialog />
    </PageContainer>
  )
}
