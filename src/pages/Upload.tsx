import React, { useState } from 'react';
import { Button, Container, Typography, Switch, Grid, FormGroup, FormControlLabel, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CustomPage from '../components/CustomPage';
import { useDispatch } from 'react-redux';
import { addResult } from '../store/slices/pics';
import { setNewAlert } from '../service/alert';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import * as tf from "@tensorflow/tfjs"
import * as poseDetection from '@tensorflow-models/pose-detection';
import { compareKeypoints, compareTimeKeypoints } from '../util/comparisons';
import { detectKeypointsImage, captureFrame } from '../util/tensorflow';

const FRAME_RATE = 10;

const Upload: React.FC = () => {
  const [target, setTarget]: any = useState(null);
  const [demo, setDemo]: any = useState(null);
  const [photoMode, setPhotoMode] = useState(true);

  const dispatch = useDispatch();

  // Handle selecting a media file (either image or video)
  const getTarget = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setTarget(file);
    }
    setNewAlert(dispatch, { msg: "Target successfully uploaded!", timeout: 5000 });
  };

  const getDemo = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setDemo(file);
    }
    setNewAlert(dispatch, { msg: "Demo successfully uploaded!", timeout: 5000 });
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

  // Returns an array of 2 elements. First element is the result, 2nd element are all frames
  const detectKeypointsVideo = async (
    video: HTMLVideoElement,
    fps: number
  ): Promise<any[]> => {
    await tf.setBackend('webgl');
    await tf.ready();
    
    // Might have to tf.setBackend() I have no idea
    const model = poseDetection.SupportedModels.MoveNet;
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};
    const detector = await poseDetection.createDetector(model, detectorConfig);
    let res: any = []
    let frames: any = []
    let currTime = 0;
    const interval = 1 / fps;
    while (currTime < video.duration) {
      let img = await captureFrame(video, currTime);
      frames.push(img);
      let poses = await detector.estimatePoses(img);
      res.push(poses[0]);
      currTime += interval;
    }

    detector.dispose();
    return [res, frames]
  }

  const handleSubmit = async () => {
    if(!target || !demo) {
      setNewAlert(dispatch, { msg: "Please upload both files!", alertType: "error", timeout: 5000 });
      return;
    }

    try {
      if (photoMode) {
        setNewAlert(dispatch, { msg: "Processing Images...", timeout: 5000 });

        // Submitting picture - picture comparison
        let target_img = fileToImage(target);
        let demo_img = fileToImage(demo);
        let target_poses = await detectKeypointsImage(target_img);
        let demo_poses = await detectKeypointsImage(demo_img);
        let target_keypoints: any = target_poses[0];
        let demo_keypoints: any = demo_poses[0];
        let result = compareKeypoints(target_keypoints, demo_keypoints);

        // Dispatch the result to the store
        dispatch(addResult({
          compareType: "pics",
          demo: demo_img,
          target: target_img,
          result: result
        }));
      } else {
        setNewAlert(dispatch, { msg: "Processing Videos...", timeout: 5000 });

        // Video comparison
        let target_vid = fileToVideo(target);
        let demo_vid = fileToVideo(demo);

        let [target_poses, target_frames] = await detectKeypointsVideo(target_vid, FRAME_RATE);
        let [demo_poses, demo_frames] = await detectKeypointsVideo(demo_vid, FRAME_RATE);
        
        let target_keypoints: any = target_poses;
        let demo_keypoints: any = demo_poses;
        let result = compareTimeKeypoints(demo_keypoints, target_keypoints);

        dispatch(addResult({
          compareType: "vids",
          demo: demo_frames,
          target: target_frames,
          result: result
        }));
      }

      // Change the page to the results page
      changePage('results');
    } catch(e) {
      setNewAlert(dispatch, { msg: "Please ensure all frames contain humans", alertType: "error", timeout: 5000 });
      return;
    }
  }
  
  function fileToImage(file: File): HTMLImageElement {
    const img = new Image();
    const createdURL:string = window.URL.createObjectURL(file);
    img.src = createdURL;
    return img;
  }

  function fileToVideo(file: File): HTMLVideoElement {
    const video = document.createElement('video');
    const createdURL:string = window.URL.createObjectURL(file);
    video.src = createdURL;
    return video;
  }

  return (
    <CustomPage>
      <Container maxWidth="sm" sx={{ 
        background: 'linear-gradient(45deg, #e0f7fa, #fce4ec)',
        height: "100%",
      }}
      >
        <Box sx={{ px: 10, pt: 5 }}>
          <img src="/img/undraw_upload_re_pasx.svg"/>
        </Box>

        <Typography align="center" variant="body1" sx={{ mt: 3, mx: 2 }}>
          Upload photos or videos to compare your form against an expert and receive AI-powered feedback!
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ pt: 2 }}>
          <FormGroup>
            <FormControlLabel control={<Switch onChange = {handleModeChange} />} label= { photoMode ? "Compare Photos" : "Compare Videos" } />
          </FormGroup>
        </Box>

        <Grid container sx={{ pt: 2, px: 1 }} >
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            <input
              type="file"
              accept={photoMode ? "image/*" : "video/*" }
              style={{ display: 'none' }} // Hide the default file input
              id="target-upload" // ID for label reference
              onChange={getTarget}
            />
            {/* MUI Button to trigger file input */}
            <label htmlFor="target-upload">
              <Button variant="contained" startIcon={<FileUploadIcon />} fullWidth component="span">
                Upload Target
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
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
              <Button variant="outlined" startIcon={<FileUploadIcon />} fullWidth component="span">
                Upload Demo
              </Button>
            </label>
          </Grid>
        </Grid>

        <Container sx={{ px: 2 }}>
          {
            target ?
            <Typography variant="subtitle1" mt={1}>
              Target file: <strong>{target.name}</strong>
            </Typography>
            :
            <></>
          }

          {
            demo ?
            <Typography variant="subtitle1" mt={1}>
              Demo file: <strong>{demo.name}</strong>
            </Typography>
            :
            <></>
          }
        </Container>
        
        {/* Submit */}
        <Container sx={{ mt: 3 }}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Check Match
          </Button>
        </Container>

        <Container sx={{ mt: 1, mb: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => {changePage('')}}>
            Cancel
          </Button>
        </Container>
      </Container>

    </CustomPage>
  )
};

export default Upload;