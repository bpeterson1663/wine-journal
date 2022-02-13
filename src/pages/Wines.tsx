import React, { useEffect } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { fetchWineListStart } from '../features/wine/wineSlice'
import { useAppDispatch, useAppSelector } from '../features/hooks'

const Wines = () => {
  const dispatch = useAppDispatch()
  const { wineList } = useAppSelector((state) => state.wine)
  useEffect(() => {
    dispatch(fetchWineListStart('1'))
  }, [dispatch])
  return (
    <Container component="main">
      <Typography component="header">Wines</Typography>
      <List sx={{ maxWidth: 600, margin: '0 auto' }}>
        {wineList.map((wine) => (
          <ListItem alignItems="flex-start" key={wine.id}>
            <ListItemAvatar>
              <Avatar alt={`${wine.producer}`} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
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
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Wines
