import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Container, Typography, Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import CustomPage from "../components/CustomPage";
import { useSelector } from "react-redux";
import { selectPicsState } from "../store/slices/pics";

const normalizeScore = (score: number, compareType: string) => {
  const rawScore = (compareType == 'pics' ? 1 + score : 2 - score) / 2;
  const mathMap = rawScore * rawScore;
  return Math.round(mathMap * 10000) / 100;
}

const Results: React.FC = () => {
  const res: any = useSelector(selectPicsState);
  
  const [leftImg, setLeftImg]: any = useState('');
  const [rightImg, setRightImg]: any = useState('');
  const [frame, setFrame]: any = useState(1);

  const normScore = res.compareType == 'pics' ?
    normalizeScore(res.result.overall, res.compareType) :
    normalizeScore(res.result.costOverall, res.compareType);

  const maxFrames = res.compareType == 'vids' ? res.demo.length : 1;

  // Render images
  useEffect(() => {
    if(res.compareType == 'pics') {
      setLeftImg(res.demo);
      setRightImg(res.target);
    } else {
      setLeftImg(res.demo[frame-1]);
      setRightImg(res.target[res.result.mappingPerFrame[frame-1]]);
    }
  }, [res, frame]);

  // History func
  const history = useHistory();
  const changePage = (page: string) => {
      history.push('/' + page);
  }

  // Utility function for generating text feedback
  const getTextFeedback = () => {
    if(res.compareType == 'pics') {
      const keys = ['head', 'body', 'arms', 'legs'];
      const scores = keys.map((key: string) => res.result[key]);
      const scoresSorted = scores.sort();
      let worstKey = keys[scores.indexOf(scoresSorted[0])];
      let secondWorstKey = keys[scores.indexOf(scoresSorted[1])];
      if(worstKey == 'arm' || worstKey == 'legs') {
        worstKey = worstKey.substring(0, 3);
      }
      if(secondWorstKey == 'arm' || secondWorstKey == 'legs') {
        secondWorstKey = secondWorstKey.substring(0, 3);
      }
      return `You need to work on your ${worstKey} positions! You could also consider improving your ${secondWorstKey} positions.`;
    } else {
      const midFrames1 = Math.floor(maxFrames / 3);
      const midFrames2 = Math.floor(2 * maxFrames / 3);
      const firstThirdAvg = res.result.costPerFrame.slice(0, midFrames1).reduce((a: number, b: number) => a + b, 0) / midFrames1;
      const secondThirdAvg = res.result.costPerFrame.slice(midFrames1, midFrames2).reduce((a: number, b: number) => a + b, 0) / (midFrames2 - midFrames1);
      const lastThirdAvg = res.result.costPerFrame.slice(midFrames2).reduce((a: number, b: number) => a + b, 0) / (maxFrames - midFrames2);      
      if (firstThirdAvg < secondThirdAvg && firstThirdAvg < lastThirdAvg) {
        return "You started off strong, but you need to maintain that consistency!";
      } else if (secondThirdAvg < firstThirdAvg && secondThirdAvg < lastThirdAvg) {
        return "You have a great mid-game, but need to work on your start and end!";
      } else {
        return "You finished strong, but you need to work on getting a stronger start!";
      }
    }
  }

  return (
    <CustomPage>
      <Container maxWidth="sm" sx={{ 
        background: 'linear-gradient(45deg, #e0f7fa, #fce4ec)',
        height: "100%",
      }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ px: 1, py: 2 }}
          color={normScore >= 80 ? "green" : (normScore >= 60 ? "orange" : "red")}
        >
          Similarity: <strong>{normScore}%</strong>
        </Typography>
        
        {/* Image comparison */}
        <Box>
          <Grid container sx={{ px: 1 }} >
            <Grid item xs={6} sx={{ mb: 1, pr: 1 }}>
              <Typography variant="body1" align="center">Demo (You)</Typography>
              <img src={leftImg.src}/>
            </Grid>
            <Grid item xs={6} sx={{ mb: 1, pl: 1 }}>
              <Typography variant="body1" align="center">Target (Expert)</Typography>
              <img src={rightImg.src}/>
            </Grid>
          </Grid>
        </Box>

        {/* Video stuff */}
        {
          res.compareType == 'vids' &&
          <Box sx={{ px: 1 }}>
            <Typography variant="body1" sx={{ pt: 1 }} align="center">
              Frame <strong>{frame}/{maxFrames}</strong>, Score: <strong>{
                normalizeScore(res.result.costPerFrame[frame-1], res.compareType)
              }</strong>
            </Typography>
            <Slider
              value={frame}
              min={1}
              max={maxFrames}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, val) => setFrame(val)}
            />
          </Box>
        }

        {/* Feedback */}
        <Box sx={{ px: 1, pt: 2 }}>
          <Typography variant="body1" align="center">
            <strong>Feedback:</strong> {normScore >= 90 ? "Great job, you slayed! 🔥" : getTextFeedback()}
          </Typography>
        </Box>

        {/* Back button */}
        <Box sx={{ mt: 2, mb: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => {changePage('')}}>
            Return Home
          </Button>
        </Box>
      </Container>
    </CustomPage>
  );
};

export default Results;
