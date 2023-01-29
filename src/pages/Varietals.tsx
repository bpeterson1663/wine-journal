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
import VarietalRow from '../components/varietal-row/varietal-row.component'
import { useAppDispatch, useAppSelector } from '../features/hooks'
import { fetchVarietalListStart } from '../features/varietal/varietalSlice'
import { VarietalT } from '../types'

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof VarietalT) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof VarietalT
  label: string
  numeric: boolean
  mobileOnly: boolean
}

type FilterKey = 'name' | 'regionsGrown'
interface FilterFormT {
  filterKey: 'name' | 'regionsGrown'
  filterValue: string
}

const FILTERS = [
  { value: 'name', label: 'Varietal' },
  { value: 'regionsGrown', label: 'Regions Grown' },
]

const Varietals = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { varietalList } = useAppSelector((state) => state.varietal)
  const { handleSubmit, control } = useForm<FilterFormT>()
  const [filterKey, setFilterKey] = useState<FilterKey>('name')
  const [filterValue, setFilterValue] = useState('')
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof VarietalT>('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    dispatch(fetchVarietalListStart())
  }, [dispatch])

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
      mobileOnly: true,
    },
    {
      id: 'style',
      numeric: false,
      disablePadding: false,
      label: 'Style',
      mobileOnly: true,
    },
    {
      id: 'regionsGrown',
      numeric: false,
      disablePadding: false,
      label: 'Region(s) Grown',
      mobileOnly: false,
    },
    {
      id: 'servingTemp',
      numeric: false,
      disablePadding: false,
      label: 'Serving Temp',
      mobileOnly: false,
    },
  ]

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: keyof VarietalT) => (event: MouseEvent<unknown>) => {
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
                align={headCell.id === 'name' ? 'left' : 'right'}
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
    setFilterKey('name')
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
          Varietals
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
                defaultValue="name"
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

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof VarietalT) => {
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
  const filterVarietals = (val: VarietalT) => {
    if (filterKey === 'regionsGrown') {
      let isMatch = false
      val.regionsGrown.split(', ').forEach((item) => {
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - varietalList.length) : 0

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
              onClick={() => navigate('/new-varietal')}
            >
              New Varietal
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
                  rowCount={varietalList.filter(filterVarietals).length}
                />
                <TableBody>
                  {varietalList
                    .slice()
                    .filter(filterVarietals)
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`
                      return <VarietalRow key={row.id} row={row} labelId={labelId} isMobile={isMobile} />
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
              count={varietalList.filter(filterVarietals).length}
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

export default Varietals
