import React, { useState } from 'react';
import { Button, Container, Typography, Switch, FormGroup, FormControlLabel, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CustomPage from '../components/CustomPage';

import { compareKeypoints } from '../util/comparisons';
import { detectKeypointsImage, detectKeypointsVideo } from '../util/tensorflow';

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

  const history = useHistory();
  const changePage = (page: string) => {
      history.push('/' + page);
  }

  const handleSubmit = async () => {
    if (photoMode) {
      // Submitting picture - picture comparison
      let target_img = fileToImage(target);
      let demo_img = fileToImage(demo);
      let target_poses = await detectKeypointsImage(target_img);
      let demo_poses = await detectKeypointsImage(demo_img);
      let target_keypoints: any = target_poses[0];
      let demo_keypoints: any = demo_poses[0];
      let result = compareKeypoints(target_keypoints, demo_keypoints);
      console.log(result);
    } else {
      let target_vid = fileToVideo(target);
      let demo_vid = fileToVideo(demo);
      console.log(target_vid);
      let target_poses = await detectKeypointsVideo(target_vid);
      let demo_poses = await detectKeypointsVideo(demo_vid);
      let target_keypoints: any = target_poses[0];
      let demo_keypoints: any = demo_poses[0];
      let result = compareKeypoints(target_keypoints, demo_keypoints);
      console.log(target_keypoints[0].length)
      console.log(result)
    }
    // changePage("results")
  }
  
  function fileToImage(file: File): HTMLImageElement {
    const img = new Image();
    const createdURL:string = window.URL.createObjectURL(file);
    img.src = createdURL;
    img.onload = () => {
      // Destructor for the URL
      URL.revokeObjectURL(createdURL);
    }
    return img;
  }

  function fileToVideo(file: File): HTMLVideoElement {
    const video = document.createElement('video');
    const createdURL:string = window.URL.createObjectURL(file);
    video.src = createdURL;
    video.onload = () => {
      URL.revokeObjectURL(createdURL);
    }
    return video;
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
        <Button variant="outlined" fullWidth onClick={handleSubmit}>
          Check the match!
        </Button>
      </Container>
    </CustomPage>
  )
};

export default Upload;