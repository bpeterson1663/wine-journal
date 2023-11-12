import { useState } from 'react'
import { Group, Modal, Button, Title, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { selectWineById } from 'features/cellar/cellarSelectors'
import { fetchWineDeleteStart, wineSetEdit } from 'features/cellar/cellarSlice'
import styles from 'pages/styles/pages.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { tastingSetOpen } from 'features/tasting/tastingSlice'
import PageContainer from 'components/page-container/page-container.component'
import { WineT } from 'schemas/cellar'
import Footer from 'components/footer/footer.component'

export default function WineId () {
  const [opened, { open, close }] = useDisclosure(false)

  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = params.id ?? ''
  const wine = useAppSelector(selectWineById(id))
  const [itemToDelete, setItemToDelete] = useState('')
  const { status } = useAppSelector(state => state.tasting)

  if (!wine) {
    navigate('/cellar')
    return null
  }

  const handleConfirmDeleteOpen = (id: string) => {
    setItemToDelete(id)
    open()
  }

  const handleConfirmDeleteClose = () => {
    setItemToDelete('')
    close()
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

  const handleOpenBottleClick = (wine: WineT) => {
    dispatch(tastingSetOpen(wine))
    navigate('/tastings/new')
  }

  const ConfirmDeleteDialog = () => (
    <Modal opened={ opened } onClose={ close } title="Delete Wine">
      <Text>Are you sure you want to delete this wine?</Text>
      <Group>
        <Button autoFocus onClick={ handleConfirmDeleteClose }>
          Cancel
        </Button>
        <Button onClick={ handleDelete } autoFocus>
          Delete
        </Button>
      </Group>
    </Modal>
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
    <PageContainer title={ producer }>
      <section className={ styles.container }>
        <div className={ styles.column }>
          <img className={ styles.wineImage } src={ labelUri || require('images/wine-tasting.jpg') } alt={ producer } />
        </div>
        <div className={ styles.column }>
          { producer && <Title order={ 6 }>Winery: { producer }</Title> }
          { classification && <Title order={ 6 }>Name: { classification }</Title> }
          <Text size="sm">Varietal(s): { varietal.join(', ') }</Text>
          <Text size="sm">Vintage: { vintage }</Text>
          <Text size="sm">Country: { country }</Text>

          <Text size="sm">Region: { region }</Text>
          { subregion && <Text size="sm">Subregion: { subregion }</Text> }

        </div>
      </section>
      <Footer>
        <Group style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
          <Button color="secondary" variant="contained" onClick={ () => { handleOpenBottleClick(wine) } } >
            Open Bottle
          </Button>
          <Button color="secondary" variant="contained" onClick={ () => { handleEditClick(wine) } }>
            Edit
          </Button>
          <Button color="info" onClick={ () => { handleConfirmDeleteOpen(wine.id) } } variant="outlined">
            Delete
          </Button>
        </Group>
      </Footer>
      <ConfirmDeleteDialog />
    </PageContainer>
  )
}
