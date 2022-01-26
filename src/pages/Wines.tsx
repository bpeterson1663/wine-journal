import React, { useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { getWines } from '../api'
import { WineT } from '../types'

const Wines = () => {
  const [wines, setWines] = useState<WineT[]>([])
  const getAllWines = async () => {
    const { payload, success } = await getWines()
    const wines: WineT[] = []
    if (success) {
      payload?.forEach((wine: WineT) => wines.push(wine))
    }
    setWines(wines)
  }
  useEffect(() => {
    getAllWines()
  }, [])
  return (
    <Container component="main">
      <Typography component="header">Wines</Typography>
      <List>
        {wines.map((wine) => (
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
