import React, { useState, MouseEvent } from 'react'
import { Box, Collapse, Container, IconButton, TableRow, TableCell, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { getLabel } from '../../helpers'
import { VarietalT } from '../../types'

const VarietalRow = ({ row, labelId, isMobile }: { row: VarietalT; labelId: string; isMobile: boolean }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<readonly string[]>([])
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

  return (
    <>
      <TableRow hover onClick={(event) => handleClick(event, row.name)} tabIndex={-1} key={row.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {isMobile ? (
          <>
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.style}</TableCell>
          </>
        ) : (
          <>
            <TableCell component="td" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.style}</TableCell>
            <TableCell align="right">
              {row.regionsGrown
                .split(', ')
                .map((item, i) => `${item}`)
                .join(', ')}
            </TableCell>
            <TableCell align="right">{row.servingTemp}</TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 4 : 7}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ display: 'flex', flexFlow: 'column' }}>
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
                  </Container>
                ) : (
                  <Typography variant="h6" component="div">
                    Details
                  </Typography>
                )}
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {row.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {row.style}
                </Typography>
              </Box>
              <Box sx={InfoStyle}>
                <Typography variant="h6" component="div">
                  Taste
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Body: {getLabel('BODY', row.body)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Tannin: {getLabel('TANNIN', row.tannin)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Acidity: {getLabel('ACIDITY', row.acidity)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Alcohol: {getLabel('ALCOHOL', row.alcohol)}%
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Sweet: {getLabel('SWEET', row.sweetness)}
                </Typography>
              </Box>
              <Box sx={InfoStyle}>
                <Typography variant="h6" component="div">
                  Remarks and Review
                </Typography>
                <Typography variant="body2">{row.description}</Typography>
                <Typography variant="body2">{row.pairing}</Typography>
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default VarietalRow
