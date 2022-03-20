import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
  Box,
  Card,
  Button,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  TableSortLabel,
  Toolbar,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { WineT } from '../types'
import { fetchWineListStart } from '../features/wine/wineSlice'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { visuallyHidden } from '@mui/utils'
import RatingIcon from '../components/rating/raiting.component'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ColorPalette from '../components/color-palette/color-palette.component'
import { getLabel } from '../helpers'

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof WineT) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof WineT
  label: string
  numeric: boolean
}

type SearchKey = 'producer' | 'vintage' | 'varietal'
interface SearchFormT {
  searchKey: 'producer' | 'vintage' | 'varietal'
  searchValue: string
}

const Row = ({ row, labelId }: { row: WineT; labelId: string }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])

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
  return (
    <>
      <TableRow hover onClick={(event) => handleClick(event, row.producer)} tabIndex={-1} key={row.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.producer}</TableCell>
        <TableCell align="right">{row.vintage}</TableCell>
        <TableCell align="right">{row.varietal.map((item, i) => `${item}`).join(', ')}</TableCell>
        <TableCell align="right">
          <RatingIcon rating={row.rating} fontSize="medium" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Container sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" component="div">
                  Details
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
              <Box sx={{ marginTop: '4px' }}>
                <Typography variant="h6" component="div">
                  Color and Smell
                </Typography>
                <ColorPalette color={row.color} hue={row.hue} intensity={row.intensity} />
                <Typography variant="body2">{row.smell}</Typography>
              </Box>
              <Box sx={{ marginTop: '4px' }}>
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
              <Box>
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

const Wines = () => {
  const dispatch = useAppDispatch()
  const { wineList } = useAppSelector((state) => state.wine)
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<SearchFormT>()
  const [searchKey, setSearchKey] = useState<SearchKey>('producer')
  const [searchValue, setSearchValue] = useState('')
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof WineT>('date')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchWineListStart(currentUser?.uid ?? ''))
  }, [dispatch, currentUser?.uid])

  const headCells: readonly HeadCell[] = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Date',
    },
    {
      id: 'producer',
      numeric: false,
      disablePadding: false,
      label: 'Producer',
    },
    {
      id: 'vintage',
      numeric: false,
      disablePadding: false,
      label: 'Vintage',
    },
    {
      id: 'varietal',
      numeric: false,
      disablePadding: false,
      label: 'Varietal(s)',
    },
    {
      id: 'rating',
      numeric: true,
      disablePadding: false,
      label: 'Rating',
    },
  ]

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string | string[] }, b: { [key in Key]: number | string | string[] }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof WineT) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          <TableCell />
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.id === 'date' ? 'left' : 'right'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const applySearchSubmit: SubmitHandler<SearchFormT> = (data) => {
    setSearchKey(data.searchKey)
    setSearchValue(data.searchValue)
  }
  const EnhancedTableToolbar = () => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
        }}
      >
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Your Wines
        </Typography>
        <SearchIcon />

        <Container
          component="form"
          sx={{
            display: 'flex',
            flexFlow: 'row',
          }}
          onSubmit={handleSubmit(applySearchSubmit)}
        >
          <Controller
            name="searchKey"
            control={control}
            defaultValue="producer"
            render={({ field }) => (
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="filter-by-select-label">Filter By</InputLabel>
                <Select
                  {...field}
                  sx={{ height: 40 }}
                  labelId="filter-by-select-label"
                  id="filter-by-select"
                  label="By"
                >
                  <MenuItem value="producer">Producer</MenuItem>
                  <MenuItem value="vintage">Vintage</MenuItem>
                  <MenuItem value="varietal">Varietal</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="searchValue"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField size="small" id="outlined-basic" type="search" label="Search" {...field} />
            )}
          />
          <Button type="submit" sx={{ height: 40 }}>
            Apply
          </Button>
        </Container>
      </Toolbar>
    )
  }

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof WineT) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const filterWines = (val: WineT) => {
    if (searchKey === 'varietal') {
      let isMatch = false
      val.varietal.forEach((item) => {
        if (item.toLowerCase().includes(searchValue.toLowerCase())) {
          isMatch = true
        }
      })
      return isMatch
    } else {
      return val[searchKey].toLowerCase().includes(searchValue.toLowerCase())
    }
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wineList.length) : 0

  const WineListTable = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={wineList.filter(filterWines).length}
              />
              <TableBody>
                {wineList
                  .slice()
                  .filter(filterWines)
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`
                    return <Row row={row} labelId={labelId} />
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={wineList.filter(filterWines).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    )
  }
  return (
    <Container component="main">
      <Card sx={{ margin: '10px auto', display: 'flex', flexFlow: 'column wrap' }}>
        <CardHeader
          sx={{ flexDirection: 'end' }}
          action={
            <Button sx={{ margin: '0 5px ' }} onClick={() => navigate('/new')}>
              New Entry
            </Button>
          }
        />
        <WineListTable />
      </Card>
    </Container>
  )
}

export default Wines
