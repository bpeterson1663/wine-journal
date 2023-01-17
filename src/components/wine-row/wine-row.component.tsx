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
import { fetchWineDeleteStart, wineSetEdit } from '../../features/wine/wineSlice'
import { WineT } from '../../types'

const WineRow = ({ row, labelId, isMobile }: { row: WineT; labelId: string; isMobile: boolean }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.wine)
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
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.createdAt}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
          </>
        ) : (
          <>
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.createdAt}
            </TableCell>
            <TableCell align="right">{row.producer}</TableCell>
            <TableCell align="right">{row.vintage}</TableCell>
            <TableCell align="right">{row.varietal.map((item, i) => `${item}`).join(', ')}</TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 4 : 7}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ display: 'flex', flexFlow: 'column' }}>
            {!isMobile && (
              <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleEditWineClick(row)}>
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
                      <IconButton onClick={() => handleEditWineClick(row)}>
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
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default WineRow
