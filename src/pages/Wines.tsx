import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { Card, Container, Typography, List, ListItem, ListItemText, Button, CardHeader } from '@mui/material'
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

  return (
    <Container component="main">
      <Card sx={{ margin: '10px auto', maxWidth: 400, display: 'flex', flexFlow: 'column wrap' }}>
        <CardHeader
          sx={{ flexDirection: 'end' }}
          action={
            <Button sx={{ margin: '0 5px ' }} onClick={() => navigate('/new')}>
              New Wine
            </Button>
          }
        />

        <List sx={{ maxWidth: 400, margin: '0 auto', width: '90%' }}>
          {wineList.map((wine) => (
            <ListItem
              sx={{ flexFlow: 'row wrap', justifyContent: 'space-evenly', alignItems: 'center' }}
              alignItems="flex-start"
              key={wine.id}
            >
              <Typography component="span">{wine.date}</Typography>

              <NavLink to={`/wine/${wine.id}`}>
                <ListItemText
                  primary={wine.producer}
                  secondary={
                    <>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {wine.varietal}
                      </Typography>
                      {` - ${wine.vintage}`}
                    </>
                  }
                />
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  )
}

export default Wines
