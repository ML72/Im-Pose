import React, { useState } from 'react';
import { Button, Container, Typography, Switch, FormGroup, FormControlLabel, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';
import { Camera, CameraResultType } from '@capacitor/camera';

const Upload: React.FC = () => {
  const [target, setTarget]: any = useState(null);
  const [demo, setDemo]: any = useState(null);
  const [photoMode, setPhotoMode] = useState(true);

  // Handle selecting a media file (either image or video)
  const getTarget = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setTarget(file);
    }
  };

  const getDemo = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setDemo(file);
    }
  };

  const clearUploads = () => {
    setTarget(null);
    setDemo(null);
  }

  const handleModeChange = () => {
    clearUploads();
    setPhotoMode(!photoMode);
  }
  
  return (
    <CustomPage>
      <Typography align="center" variant="body1" sx={{ mt: 3, mx: 2 }}>
        This is the upload page.
      </Typography>

      <Box display="flex" justifyContent="center">
        <FormGroup>
          <FormControlLabel control={<Switch onChange = {handleModeChange} />} label= { photoMode ? "Photo Check" : "Video Check" } />
        </FormGroup>
      </Box>

      {/* Target Image */}
      <Container sx={{ mt: 3 }}>
        {/* Hidden input for file selection */}
        <input
          type="file"
          accept={photoMode ? "image/*" : "video/*" }
          style={{ display: 'none' }} // Hide the default file input
          id="target-upload" // ID for label reference
          onChange={getTarget}
        />
        {/* MUI Button to trigger file input */}
        <label htmlFor="target-upload">
          <Button variant="contained" fullWidth component="span">
            Upload Target
          </Button>
        </label>
        {
          target ? 
          <Typography variant="subtitle1" mt={1}>
            {target.name}
          </Typography>
          :
          <></>
        }
      </Container>


      {/* Demo Image */}
      <Container sx={{ mt: 3 }}>
        {/* Hidden input for file selection */}
        <input
          type="file"
          accept={photoMode ? "image/*" : "video/*" }
          style={{ display: 'none' }} // Hide the default file input
          id="demo-upload" // ID for label reference
          onChange={getDemo}
        />
        {/* MUI Button to trigger file input */}
        <label htmlFor="demo-upload">
          <Button variant="contained" fullWidth component="span">
            Upload Demo
          </Button>
        </label>
        {
          demo ? 
          <Typography variant="subtitle1" mt={1}>
            {demo.name}
          </Typography>
          :
          <></>
        }
      </Container>


      {/* Submit */}
      <Container sx={{ mt: 3 }}>
        <Button variant="outlined" fullWidth onClick={() => {}}>
          Check the match!
        </Button>
      </Container>
    </CustomPage>
  )
};

export default Upload;