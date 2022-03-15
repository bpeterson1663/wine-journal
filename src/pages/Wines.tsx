import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import {
  Card,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'
import { fetchWineListStart } from '../features/wine/wineSlice'
import { useAppDispatch, useAppSelector } from '../features/hooks'

const Wines = () => {
  const dispatch = useAppDispatch()
  const { wineList } = useAppSelector((state) => state.wine)
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchWineListStart(currentUser?.uid ?? ''))
  }, [dispatch, currentUser?.uid])
  const NavLink = styled(Link)(() => ({
    textDecoration: 'none',
  }))
  const WineListTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="wine list table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Producer</TableCell>
              <TableCell align="right">Vintage</TableCell>
              <TableCell align="right">Varietal(s)</TableCell>
              <TableCell align="right">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wineList.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">
                  <NavLink to={`/wine/${row.id}`}>{row.producer}</NavLink>
                </TableCell>
                <TableCell align="right">{row.vintage}</TableCell>
                <TableCell align="right">{row.varietal.map((item, i) => `${item}`).join(', ')}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return (
    <Container component="main">
      <Card sx={{ margin: '10px auto', display: 'flex', flexFlow: 'column wrap' }}>
        <CardHeader
          sx={{ flexDirection: 'end' }}
          action={
            <Button sx={{ margin: '0 5px ' }} onClick={() => navigate('/new')}>
              New Wine
            </Button>
          }
        />
        <WineListTable />
      </Card>
    </Container>
  )
}

export default Wines
