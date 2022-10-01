import { Button, Box, Container, TextField, FormLabel, Slider, FormControl, Snackbar } from '@mui/material'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { VarietalT } from '../../types'
import { styled } from '@mui/material/styles'
import { BODY_MARKS, TANNIN_ACIDITY_MARKS, ALCOHOL_MARKS, SWEET_MARKS } from '../form-wine/form-wine.constants'
import { fetchVarietalCreateStart } from '../../features/varietal/varietalSlice'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import React, { useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const StyledTextField = styled(TextField)({
  margin: '5px 0',
})
const StyledSlider = styled(Slider)(() => ({
  '& .MuiSlider-markLabel': {
    fontSize: '12px',
    transform: 'rotate(-45deg)',
    marginLeft: '-20px',
  },
}))

const StyledFormControl = styled(FormControl)(() => ({
  margin: '10px',
}))

const NewVarietal = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const { message } = useAppSelector((state) => state.varietal)

  const methods = useForm<VarietalT>({
    mode: 'all',
  })
  const onSubmitHandler: SubmitHandler<VarietalT> = (data) => {
    console.log(data)
    dispatch(fetchVarietalCreateStart({...data}))
    setOpen(true)
    setTimeout(() => setOpen(false), 5000)
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <FormProvider {...methods}>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column wrap',
          maxWidth: 600,
          width: '90%',
        }}
        component="form"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Box sx={{ width: '100%', maxWidth: 600, margin: '10px auto', display: 'flex', flexDirection: 'column' }}>
          <Controller
            name="name"
            control={methods.control}
            render={({ field }) => <StyledTextField {...field} id="name" type="text" label="Name" variant="outlined" />}
          />
          <Controller
            name="style"
            control={methods.control}
            render={({ field }) => (
              <StyledTextField {...field} id="style" type="text" label="Style" variant="outlined" />
            )}
          />
          <Controller
            name="flavors"
            control={methods.control}
            render={({ field }) => (
              <StyledTextField {...field} id="flavors" type="text" label="Flavors" variant="outlined" />
            )}
          />
          <Controller
            name="regionsGrown"
            control={methods.control}
            render={({ field }) => (
              <StyledTextField {...field} id="regionsGrown" type="text" label="Region(s) Grown" variant="outlined" />
            )}
          />
          <Controller
            name="decantTime"
            control={methods.control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                id="decantTime"
                type="number"
                label="Decant Time (minutes)"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="servingTemp"
            control={methods.control}
            render={({ field }) => (
              <StyledTextField {...field} id="servingTemp" type="text" label="Serving Temperature" variant="outlined" />
            )}
          />
          <StyledFormControl>
            <FormLabel id="body-label">Body</FormLabel>
            <Controller
              name="body"
              control={methods.control}
              defaultValue={1}
              render={({ field }) => (
                <StyledSlider
                  valueLabelDisplay="off"
                  max={5}
                  min={1}
                  step={1}
                  marks={BODY_MARKS}
                  {...field}
                  aria-labelledby="body-label"
                />
              )}
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel id="tannin-label">Tannin</FormLabel>
            <Controller
              name="tannin"
              control={methods.control}
              defaultValue={1}
              render={({ field }) => (
                <StyledSlider
                  valueLabelDisplay="off"
                  max={5}
                  min={1}
                  step={1}
                  marks={TANNIN_ACIDITY_MARKS}
                  {...field}
                  aria-labelledby="tannin-label"
                />
              )}
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel id="acidity-label">Acidity</FormLabel>
            <Controller
              name="acidity"
              control={methods.control}
              defaultValue={1}
              render={({ field }) => (
                <StyledSlider
                  valueLabelDisplay="off"
                  max={5}
                  min={1}
                  step={1}
                  marks={TANNIN_ACIDITY_MARKS}
                  {...field}
                  aria-labelledby="acidity-label"
                />
              )}
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel id="alcohol-label">Alcohol(%)</FormLabel>
            <Controller
              name="alcohol"
              control={methods.control}
              defaultValue={1}
              render={({ field }) => (
                <StyledSlider
                  valueLabelDisplay="off"
                  max={5}
                  min={1}
                  step={1}
                  marks={ALCOHOL_MARKS}
                  {...field}
                  aria-labelledby="alcohol-label"
                />
              )}
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel id="sweet-label">Sweet</FormLabel>
            <Controller
              name="sweetness"
              control={methods.control}
              defaultValue={1}
              render={({ field }) => (
                <StyledSlider
                  valueLabelDisplay="off"
                  max={5}
                  min={1}
                  step={1}
                  marks={SWEET_MARKS}
                  {...field}
                  aria-labelledby="sweet-label"
                />
              )}
            />
          </StyledFormControl>
          <Controller
            name="description"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <TextField multiline rows={4} id="description" label="Description" variant="outlined" {...field} />
            )}
          />
          <Controller
            name="pairing"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <TextField multiline rows={4} id="pairing" label="Paring" variant="outlined" {...field} />
            )}
          />
        </Box>
        <Box>
          <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
            Add
          </Button>
        </Box>
      </Container>
    </FormProvider>
  )
}
export default NewVarietal
