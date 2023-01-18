import FilterListIcon from '@mui/icons-material/FilterList'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Container,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { visuallyHidden } from '@mui/utils'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getComparator, Order } from '../components/table/helpers'
import WineRow from '../components/wine-row/wine-row.component'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { fetchWineListStart } from '../features/wine/wineSlice'
import { WineT } from '../types'

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
  mobileOnly: boolean
}

type FilterKey = 'producer' | 'vintage' | 'varietal'
interface FilterFormT {
  filterKey: 'producer' | 'vintage' | 'varietal'
  filterValue: string
}

const FILTERS = [
  { value: 'producer', label: 'Producer' },
  { value: 'varietal', label: 'Varietal' },
  { value: 'vintage', label: 'Vintage' },
]

const Cellar = () => {
  const dispatch = useAppDispatch()
  const { wineList } = useAppSelector((state) => state.wine)
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<FilterFormT>()
  const [filterKey, setFilterKey] = useState<FilterKey>('producer')
  const [filterValue, setFilterValue] = useState('')
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof WineT>('date')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    dispatch(fetchWineListStart(currentUser?.uid ?? ''))
  }, [dispatch, currentUser?.uid])

  const headCells: readonly HeadCell[] = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Date Added',
      mobileOnly: true,
    },
    {
      id: 'producer',
      numeric: false,
      disablePadding: false,
      label: 'Producer',
      mobileOnly: true,
    },
    {
      id: 'vintage',
      numeric: false,
      disablePadding: false,
      label: 'Vintage',
      mobileOnly: false,
    },
    {
      id: 'varietal',
      numeric: false,
      disablePadding: false,
      label: 'Varietal(s)',
      mobileOnly: false,
    },
  ]

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof WineT) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          <TableCell />
          {headCells
            .filter((headCell) => (isMobile ? headCell.mobileOnly : headCell))
            .map((headCell) => (
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

  const applyFilterSubmit: SubmitHandler<FilterFormT> = (data) => {
    setFilterKey(data.filterKey)
    setFilterValue(data.filterValue)
    setShowFilterMenu(false)
  }

  const resetFilter = () => {
    setFilterKey('producer')
    setFilterValue('')
  }

  const getFilterLabel = (value: FilterKey) => FILTERS.find((filter) => filter.value === value)?.label
  
  const EnhancedTableToolbar = () => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
        }}
      >
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Your Cellar
        </Typography>
        {filterValue ? (
          <Chip label={`${getFilterLabel(filterKey)}: ${filterValue}`} onDelete={resetFilter} />
        ) : (
          <IconButton onClick={() => setShowFilterMenu(!showFilterMenu)}>
            <FilterListIcon />
          </IconButton>
        )}

        <Drawer anchor="right" open={showFilterMenu} onClose={() => setShowFilterMenu(false)}>
          <Box sx={{ width: 250 }}>
            <Container
              component="form"
              sx={{
                display: 'flex',
                flexFlow: 'column',
                marginTop: 10,
              }}
              onSubmit={handleSubmit(applyFilterSubmit)}
            >
              <Controller
                name="filterKey"
                control={control}
                defaultValue="producer"
                render={({ field }) => (
                  <FormControl sx={{ width: '100%', marginBottom: '20px' }}>
                    <InputLabel id="filter-by-select-label">Filter By</InputLabel>
                    <Select
                      {...field}
                      sx={{ height: 40 }}
                      labelId="filter-by-select-label"
                      id="filter-by-select"
                      label="Filter By"
                    >
                      {FILTERS.map((filter) => (
                        <MenuItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="filterValue"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField size="small" id="filterFor" type="filter" label="Filter For" {...field} />
                )}
              />
              <Button type="submit" sx={{ height: 40 }}>
                Apply
              </Button>
            </Container>
          </Box>
        </Drawer>
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
    if (filterKey === 'varietal') {
      let isMatch = false
      val.varietal.forEach((item) => {
        if (item.toLowerCase().includes(filterValue.toLowerCase())) {
          isMatch = true
        }
      })
      return isMatch
    } else {
      return val[filterKey].toLowerCase().includes(filterValue.toLowerCase())
    }
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wineList.length) : 0

  return (
    <Container component="main">
      <Card sx={{ margin: '10px auto', display: 'flex', flexFlow: 'column wrap' }}>
        <CardHeader
          sx={{ flexDirection: 'end' }}
          action={
            <Button
              color="secondary"
              variant="contained"
              sx={{ margin: '0 5px ' }}
              onClick={() => navigate('/new-wine')}
            >
              New Entry
            </Button>
          }
        />
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="medium">
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
                      return <WineRow key={row.id} row={row} labelId={labelId} isMobile={isMobile} />
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
              sx={{ width: '100%' }}
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
      </Card>
    </Container>
  )
}

export default Cellar
