import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchTastingDeleteStart, tastingSetEdit } from '../../features/tasting/tastingSlice'
import { getLabel, uppercaseFirstLetter } from '../../helpers'
import { TastingT } from '../../types'
import ColorPalette from '../color-palette/color-palette.component'
import RatingIcon from '../rating/raiting.component'

const TastingRow = ({ row, labelId, isMobile }: { row: TastingT; labelId: string; isMobile: boolean }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.tasting)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])
  const [itemToDelete, setItemToDelete] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const InfoStyle = {
    width: isMobile ? '100%' : '23%',
    margin: '5px 0',
    padding: '0 5px',
  }
  const handleClick = (_: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }
  const handleConfirmDeleteOpen = (id: string) => {
    setItemToDelete(id)
    setIsConfirmOpen(true)
  }
  const handleConfirmDeleteClose = () => {
    setItemToDelete('')
    setIsConfirmOpen(false)
  }
  const handleDeleteTasting = () => {
    dispatch(fetchTastingDeleteStart(itemToDelete))
    if (status === 'success') {
      navigate('/tastings')
    }
  }

  const handleEditTastingClick = (tasting: TastingT) => {
    dispatch(tastingSetEdit(tasting))
    navigate('/edit-tasting')
  }

  const ConfirmDeleteDialog = () => (
    <Dialog open={isConfirmOpen} onClose={handleConfirmDeleteClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete Tasting</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this tasting?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirmDeleteClose}>
          Cancel
        </Button>
        <Button onClick={handleDeleteTasting} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
  return (
    <>
      <ConfirmDeleteDialog />
      <TableRow hover onClick={(event) => handleClick(event, row.producer)} tabIndex={-1} key={row.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {isMobile ? (
          <>
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.date}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
          </>
        ) : (
          <>
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.date}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
            <TableCell align="right">{row.classification}</TableCell>
            <TableCell align="right">{row.vintage}</TableCell>
            <TableCell align="right">{row.varietal.map((item, i) => `${item}`).join(', ')}</TableCell>
            <TableCell align="right">
              <RatingIcon rating={row.rating} fontSize="medium" />
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 4 : 7}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ display: 'flex', flexFlow: 'column' }}>
            {!isMobile && (
              <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleEditTastingClick(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleConfirmDeleteOpen(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </Container>
            )}
            <Container
              sx={{
                display: 'flex',
                flexFlow: isMobile ? 'column' : 'row wrap',
                justifyContent: 'space-between',
                paddingBottom: '10px',
              }}
            >
              <Box sx={InfoStyle}>
                {isMobile ? (
                  <Container sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 0, paddingRight: 0 }}>
                    <Typography variant="h6" component="div">
                      Details
                    </Typography>
                    <div>
                      <IconButton onClick={() => handleEditTastingClick(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleConfirmDeleteOpen(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Container>
                ) : (
                  <Typography variant="h6" component="div">
                    Details
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {row.producer} {row.classification && `/ ${row.classification}`}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {row.country} / {row.region} {row.subregion && `/ ${row.subregion}`}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {row.vintage} - {row.varietal.map((item) => `${item}`).join(', ')}
                </Typography>
                <Box sx={InfoStyle}>
                  <img src={row.labelUri} alt="Wine Label" style={{ width: 150 }} />
                </Box>
              </Box>
              <Box sx={InfoStyle}>
                <Typography variant="h6" component="div">
                  Color and Smell
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {uppercaseFirstLetter(row.color)} / {uppercaseFirstLetter(row.intensity)} /{' '}
                  {uppercaseFirstLetter(row.hue)}
                </Typography>
                <ColorPalette color={row.color} hue={row.hue} intensity={row.intensity} />
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {row.smell}
                </Typography>
              </Box>
              <Box sx={InfoStyle}>
                <Typography variant="h6" component="div">
                  Taste
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  Body: {getLabel('BODY', row.body)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  Tannin: {getLabel('TANNIN', row.tannin)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  Acidity: {getLabel('ACIDITY', row.acidity)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  Alcohol: {getLabel('ALCOHOL', row.alcohol)}%
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  Sweetness: {getLabel('SWEET', row.sweet)}
                </Typography>
              </Box>
              <Box sx={InfoStyle}>
                <Typography variant="h6" component="div">
                  Remarks and Review
                </Typography>
                <RatingIcon rating={row.rating} />
                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                  {row.remarks}
                </Typography>
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default TastingRow
