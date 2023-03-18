import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import './camera.css'

interface Props {
  value: string
  onChange: (dataUri: string) => void
}
export const WineLabelPic = ({ value, onChange }: Props) => {
  const [pictureMode, setPictureMode] = useState(false)
  const handleTakePhotoAnimationDone = (dataUri: string) => onChange(dataUri)
  useEffect(() => {
    if (value) {
      setPictureMode(true)
    }
  }, [value])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      {!value ? (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setPictureMode((currentState) => !currentState)
          }}
        >
          {pictureMode ? 'Turn Off Camera' : 'Take Picture'}
        </Button>
      ) : null}
      {pictureMode && value && (
        <Button color="secondary" type="submit" variant="contained" onClick={() => onChange('')}>
          Retake Picture
        </Button>
      )}
      {pictureMode ? (
        <div>
          {value ? (
            <div>
              <img src={value} alt="Wine Label" style={{ width: '100%' }} />
            </div>
          ) : (
            <Camera idealFacingMode={FACING_MODES.ENVIRONMENT} imageType={IMAGE_TYPES.JPG} imageCompression={0.97} onTakePhoto={handleTakePhotoAnimationDone} />
          )}
        </div>
      ) : null}
    </Box>
  )
}
