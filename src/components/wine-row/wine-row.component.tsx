import React, { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchWineDeleteStart } from '../../features/wine/wineSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import RatingIcon from '../../components/rating/raiting.component'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ColorPalette from '../../components/color-palette/color-palette.component'
import { getLabel } from '../../helpers'
import { WineT } from '../../types'

const WineRow = ({ row, labelId, isMobile }: { row: WineT; labelId: string; isMobile: boolean }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.wine)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])
  const [itemToDelete, setItemToDelete] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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
  const handleDeleteWine = () => {
    dispatch(fetchWineDeleteStart(itemToDelete))
    if (status === 'success') {
      navigate('/wines')
    }
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
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.date}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
          </>
        ) : (
          <>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.date}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
            <TableCell align="right">{row.vintage}</TableCell>
            <TableCell align="right">{row.varietal.map((item, i) => `${item}`).join(', ')}</TableCell>
            <TableCell align="right">
              <RatingIcon rating={row.rating} fontSize="medium" />
            </TableCell>
          </>
        )}
        <TableCell>
          <IconButton onClick={() => handleConfirmDeleteOpen(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Container
              sx={{
                display: 'flex',
                flexFlow: isMobile ? 'column' : 'row wrap',
                justifyContent: 'space-between',
                paddingBottom: '10px',
              }}
            >
              <Box sx={{ width: isMobile ? '100%' : '25%' }}>
                <Typography variant="h6" component="div">
                  Details
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {row.producer}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {row.classification}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {row.vintage} - {row.varietal.map((item) => `${item}`).join(', ')}
                </Typography>
                <Typography variant="body2">
                  {row.country} / {row.region} {row.subregion && `/ ${row.subregion}`}
                </Typography>
              </Box>
              <Box sx={{ maxWidth: isMobile ? '100%' : '25%' }}>
                <Typography variant="h6" component="div">
                  Color and Smell
                </Typography>
                <ColorPalette color={row.color} hue={row.hue} intensity={row.intensity} />
                <Typography variant="body2">{row.smell}</Typography>
              </Box>
              <Box sx={{ maxWidth: isMobile ? '100%' : '25%' }}>
                <Typography variant="h6" component="div">
                  Taste
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getLabel('BODY', row.body)} Body
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getLabel('TANNIN', row.tannin)} Tannin
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getLabel('ACIDITY', row.acidity)} Acidity
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getLabel('ALCOHOL', row.alcohol)}% Alcohol
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getLabel('SWEET', row.sweet)}
                </Typography>
              </Box>
              <Box sx={{ maxWidth: isMobile ? '100%' : '25%' }}>
                <Typography variant="h6" component="div">
                  Remarks and Review
                </Typography>
                <RatingIcon rating={row.rating} />
                <Typography variant="body2">{row.remarks}</Typography>
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default WineRow
