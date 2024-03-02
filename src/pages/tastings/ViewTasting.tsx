import { Button, Modal, Group, Title, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import ColorPalette from 'components/color-palette/color-palette.component'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { selectTastingById } from 'features/tasting/tastingSelectors'
import { deleteTasting, tastingSetEdit } from 'features/tasting/tastingSlice'
import { getLabel, uppercaseFirstLetter } from 'helpers'
import styles from 'pages/styles/pages.module.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from 'components/footer/footer.component'
import RatingIcon from 'components/rating/raiting.component'
import PageContainer from 'components/page-container/page-container.component'
import { TastingT } from 'schemas/tastings'

export default function TastingId() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const id = params.id ?? ''
  const tasting = useAppSelector(selectTastingById(id))
  const [itemToDelete, setItemToDelete] = useState('')
  const [opened, { open, close }] = useDisclosure(false)

  if (!tasting) {
    debugger;
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

  const handleDelete = async () => {
    try {
      await dispatch(deleteTasting(itemToDelete)).unwrap()
      notifications.show({
        message: 'Tasting was deleted.',
      })
      navigate('/')
    } catch (err) {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'Soemthing went wrong trying to delete your tasting notes.',
      })
    }
  }

  const handleEditClick = (wine: TastingT) => {
    dispatch(tastingSetEdit(wine))
    navigate('/tastings/edit')
  }

  const ConfirmDeleteDialog = () => (
    <Modal className={styles['delete-dialog']} opened={opened} onClose={close} title="Delete Tasting">
      <Text className={styles.content}>Are you sure you want to delete this tasting?</Text>
      <Group justify="flex-end">
        <Button variant="outline" onClick={handleConfirmDeleteClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
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
    remarks,
  } = tasting

  return (
    <PageContainer title={producer}>
      <section className={styles.container}>
        <div className={styles.column}>
          <img className={styles.wineImage} src={labelUri || require('images/wine-tasting.jpg')} alt={producer} />
        </div>
        <div className={styles.column}>
          {producer && <Title order={6}>Winery: {producer}</Title>}
          {classification && <Title order={6}>Name: {classification}</Title>}
          <Text size="sm">Varietal(s): {varietal.join(', ')}</Text>
          <Text size="sm">Vintage: {vintage}</Text>
          <Text size="sm">Country: {country}</Text>

          <Text size="sm">Region: {region}</Text>
          {subregion && <Text size="sm">Subregion: {subregion}</Text>}
          <Text size="md" style={{ mb: 1.5 }}>
            {uppercaseFirstLetter(color)} / {uppercaseFirstLetter(intensity)} / {uppercaseFirstLetter(hue)}
          </Text>
          <ColorPalette color={color} hue={hue} intensity={intensity} />
          <Text size="md" style={{ mb: 1.5 }}>
            {smell}
          </Text>
        </div>
        <div className={styles.column}>
          <Title order={6}>Taste</Title>
          <Text size="md" style={{ mb: 1.5 }}>
            Body: {getLabel('BODY', body)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Tannin: {getLabel('TANNIN', tannin)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Acidity: {getLabel('ACIDITY', acidity)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Alcohol: {getLabel('ALCOHOL', alcohol)}%
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Sweetness: {getLabel('SWEET', sweet)}
          </Text>
          <Title order={6}>Remarks and Review</Title>
          <RatingIcon rating={rating} />
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            {remarks}
          </Text>
        </div>
      </section>
      <Footer>
        <Group style={{ width: '100%' }} justify="space-between">
          <Button
            onClick={() => {
              handleConfirmDeleteOpen(tasting.id)
            }}
            variant="outline"
          >
            Delete
          </Button>
          <Button
            style={{ mt: 1, mr: 1 }}
            onClick={() => {
              handleEditClick(tasting)
            }}
          >
            Edit
          </Button>
        </Group>
      </Footer>
      <ConfirmDeleteDialog />
    </PageContainer>
  )
}
