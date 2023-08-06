import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export function GridLayout () {
  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 6 } md={ 4 }>
        <Item>
          <Typography></Typography>
        </Item>
        <Item>xs=6 md=4</Item>
        <Item>xs=6 md=4</Item>
        <Item>xs=6 md=4</Item>
      </Grid>
    </Grid>
  )
}
