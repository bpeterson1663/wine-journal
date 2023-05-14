import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { Header } from 'components/typography/typography.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { tastingSetOpen } from 'features/tasting/tastingSlice'
import { selectWineById } from 'features/wine/wineSelectors'
import { fetchWineDeleteStart, wineSetEdit } from 'features/wine/wineSlice'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from 'pages/cellar/cellar.module.css'
import { WineT } from 'types'

export default function CellarId() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = params.id || ''
  const wine = useAppSelector(selectWineById(id))
  const [itemToDelete, setItemToDelete] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { status } = useAppSelector((state) => state.wine)

  if (!wine) {
    navigate('/')
    return <></>
  }
  const { producer, labelUri, varietal, vintage, region, country, subregion, classification, quantity, price } = wine

  const handleConfirmDeleteOpen = (id: string) => {
    setItemToDelete(id)
    setIsConfirmOpen(true)
  }
  const handleConfirmDeleteClose = () => {
    setItemToDelete('')
    setIsConfirmOpen(false)
  }
  const handleDeleteWine = () => {
    dispatch(fetchWineDeleteStart(itemToDelete))
    if (status === 'success') {
      navigate('/cellar')
    }
  }

  const handleEditWineClick = (wine: WineT) => {
    dispatch(wineSetEdit(wine))
    navigate('/edit-wine')
  }

  const handleOpenBottleClick = (wine: WineT) => {
    dispatch(tastingSetOpen(wine))
    navigate('/new-tasting')
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
    <main className={styles.main}>
      <header className={styles.headerRow}>
        <Header variant="h2" text={producer} />
      </header>
      <section className={styles.container}>
        <div className={styles.column}>
          <img className={styles.wineImage} src={labelUri || './static/wine-tasting.jpg'} alt={wine?.producer} />
        </div>
        <div className={styles.column}>
          {producer && <Typography variant="h6">Winery: {producer}</Typography>}
          {classification && <Typography variant="h6">Name: {classification}</Typography>}
          <Typography variant="subtitle1">Varietal(s): {varietal.join(', ')}</Typography>
          <Typography variant="subtitle1">Vintage: {vintage}</Typography>
          <Typography variant="subtitle1">Country: {country}</Typography>

          <Typography variant="subtitle1">Region: {region}</Typography>
          {subregion && <Typography variant="subtitle1">Subregion: {subregion}</Typography>}
          <Typography variant="subtitle1">Price: ${price}</Typography>
          <Typography variant="subtitle1">Quantity: {quantity}</Typography>

          <IconButton onClick={() => handleOpenBottleClick(wine)} aria-label="Open Bottle">
            <span className="iconify" data-icon="emojione-monotone:wine-glass"></span>
          </IconButton>
          <IconButton onClick={() => handleEditWineClick(wine)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleConfirmDeleteOpen(wine.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </section>
      <ConfirmDeleteDialog />
    </main>
  )
}
