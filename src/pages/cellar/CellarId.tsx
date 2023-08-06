import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { selectWineById } from 'features/cellar/cellarSelectors'
import { fetchWineDeleteStart, wineSetEdit } from 'features/cellar/cellarSlice'
import styles from 'pages/styles/pages.module.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import PageContainer from 'components/page-container/page-container.component'
import { WineT } from 'types'

export default function CellarId () {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = params.id ?? ''
  const wine = useAppSelector(selectWineById(id))
  const [itemToDelete, setItemToDelete] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { status } = useAppSelector(state => state.tasting)

  if (!wine) {
    navigate('/cellar')
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
    dispatch(fetchWineDeleteStart(itemToDelete))
    if (status === 'success') {
      navigate('/cellar')
    }
  }

  const handleEditClick = (wine: WineT) => {
    dispatch(wineSetEdit(wine))
    navigate('/cellar/edit')
  }

  const ConfirmDeleteDialog = () => (
    <Dialog open={ isConfirmOpen } onClose={ handleConfirmDeleteClose } aria-labelledby="delete wine">
      <DialogTitle id="delete wine">Delete Wine</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this wine?</DialogContentText>
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
      <Button color="secondary" variant="contained" sx={ { mt: 1, mr: 1 } } onClick={ () => { handleEditClick(wine) } }>
        Edit
      </Button>
      <Button color="info" onClick={ () => { handleConfirmDeleteOpen(wine.id) } } variant="outlined" sx={ { mt: 1, mr: 1 } }>
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
    classification
  } = wine

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

        </div>
      </section>
      <ConfirmDeleteDialog />
    </PageContainer>
  )
}
