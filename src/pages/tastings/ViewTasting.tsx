import { Button, Modal, Group, Title, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
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
  const { status } = useAppSelector(state => state.tasting)
  const [opened, { open, close }] = useDisclosure(false)

  if (!tasting) {
    navigate('/')
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
    <Modal opened={ opened } onClose={ close } title="Authentication">
      <Modal.Title>Delete Tasting</Modal.Title>
      <Modal.Content>
        Are you sure you want to delete this tasting?
      </Modal.Content>
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

  const Actions = () => (
    <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
      <Button color="secondary" variant="contained" style={ { mt: 1, mr: 1 } } onClick={ () => { handleEditClick(tasting) } }>
        Edit
      </Button>
      <Button color="info" onClick={ () => { handleConfirmDeleteOpen(tasting.id) } } variant="outlined" style={ { mt: 1, mr: 1 } }>
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
          { producer && <Title order={ 6 }>Winery: { producer }</Title> }
          { classification && <Title order={ 6 }>Name: { classification }</Title> }
          <Text size="sm">Varietal(s): { varietal.join(', ') }</Text>
          <Text size="sm">Vintage: { vintage }</Text>
          <Text size="sm">Country: { country }</Text>

          <Text size="sm">Region: { region }</Text>
          { subregion && <Text size="sm">Subregion: { subregion }</Text> }
          <Text size="md" style={ { mb: 1.5 } }>
            { uppercaseFirstLetter(color) } / { uppercaseFirstLetter(intensity) } / { uppercaseFirstLetter(hue) }
          </Text>
          <ColorPalette color={ color } hue={ hue } intensity={ intensity } />
          <Text size="md" style={ { mb: 1.5 } } >
            { smell }
          </Text>
        </div>
        <div className={ styles.column }>
          <Title order={ 6 }>
            Taste
          </Title>
          <Text size="md" style={ { mb: 1.5 } }>
            Body: { getLabel('BODY', body) }
          </Text>
          <Text size="md" style={ { mb: 1.5 } } color="text.secondary">
            Tannin: { getLabel('TANNIN', tannin) }
          </Text>
          <Text size="md" style={ { mb: 1.5 } } color="text.secondary">
            Acidity: { getLabel('ACIDITY', acidity) }
          </Text>
          <Text size="md" style={ { mb: 1.5 } } color="text.secondary">
            Alcohol: { getLabel('ALCOHOL', alcohol) }%
          </Text>
          <Text size="md" style={ { mb: 1.5 } } color="text.secondary">
            Sweetness: { getLabel('SWEET', sweet) }
          </Text>
          <Title order={ 6 }>
            Remarks and Review
          </Title>
          <RatingIcon rating={ rating } />
          <Text size="md" style={ { mb: 1.5 } } color="text.secondary">
            { remarks }
          </Text>
        </div>
      </section>
      <ConfirmDeleteDialog />
    </PageContainer>
  )
}
