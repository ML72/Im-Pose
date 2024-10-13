import React, { useState } from 'react';
import { Button, Container, styled, Box, ButtonGroup, Grid, Stack, Avatar, Typography } from '@mui/material';
import { CameraAlt, Collections, Ballot, ViewHeadline, CloudUpload } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { keyframes, css } from '@emotion/react';

import CustomPage from '../components/CustomPage';

const Home: React.FC = () => {

  const history = useHistory();
  let changePage = (page: string) => {
      history.push('/' + page);
  }

  const fadeAwayAnimationStats = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

  const [uploadExploding, setUploadExploding] = useState(false);

  const [resultsExploding, setResultsExploding] = useState(false);
  const [statsExploding, setStatsExploding] = useState(false);

  const handleClickUpload = () => {
    setUploadExploding(true);

    setTimeout(() => {
      setUploadExploding(false);
      changePage('upload');
    }, 200);
  };

  const handleClickResults = () => {
    setResultsExploding(true);

    setTimeout(() => {
      setResultsExploding(false);
      changePage('results');
    }, 200);
  };

  const handleClickStats = () => {
    setStatsExploding(true);

    setTimeout(() => {
      setStatsExploding(false);
      changePage('stats');
    }, 200);
  };

  return (
    <CustomPage>
      <Container maxWidth="sm" sx={{ 
        background: 'linear-gradient(45deg, #e0f7fa, #fce4ec)',
        height: "100%",
        paddingY: "1rem", 
        paddingX: "1rem", 
      }}
      >
        <Box sx={{ px: 10 }}>
          <img src="/img/undraw_workout_gcgu.svg"/>
        </Box>
        <Box textAlign="center" mt={4}>
          <Typography
            variant="h4"
            sx={{
              background: 'linear-gradient(90deg, #ff6f91, #70a1ff, #4a90e2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Welcome to Impose!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, px:2 }}>
            Learn new routines and take your poses to the next level with ImPose, your very own AI coach!
          </Typography>
        </Box>
        <Grid container sx={{ py: 5, px: 1 }} >
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            {/* <Button variant="contained" startIcon={<Collections />} sx={{ width: '100%' }} onClick={() => changePage("upload")}>
              Upload
            </Button> */}
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              sx={{
                width: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
                ...(uploadExploding && {
                  animation: `${fadeAwayAnimationStats} 0.5s ease-out forwards`,
                }),
              }}
              onClick={handleClickUpload}
              disabled={uploadExploding} // Disable button during animation
            >
              Upload
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            {/* <Button variant="outlined" startIcon={<Ballot />} sx={{ width: '100%' }} onClick={() => changePage("results")}>
              Last Result
            </Button> */}
            <Button
              variant="outlined"
              startIcon={<Ballot />}
              sx={{
                width: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
                ...(resultsExploding && {
                  animation: `${fadeAwayAnimationStats} 0.5s ease-out forwards`,
                }),
              }}
              onClick={handleClickResults}
              disabled={resultsExploding} // Disable button during animation
            >
              Last Result
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ mb: 1, px: 1 }} />
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            {/* <Button variant="text" startIcon={<Ballot />} sx={{ width: '100%' }} onClick={() => changePage("stats")}>
              Stats
            </Button> */}
            {/* <Button
              variant="text"
              startIcon={<Ballot />}
              sx={{
                width: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
                ...(statsExploding && {
                  animation: `${fadeAwayAnimationStats} 0.5s ease-out forwards`,
                }),
              }}
              onClick={handleClickStats}
              disabled={statsExploding} // Disable button during animation
            >
              Stats
            </Button> */}
          </Grid>
          <Grid item xs={3} sx={{ mb: 1, px: 1 }} />
        </Grid>
      </Container>
    </CustomPage>
  )
};

export default Home;