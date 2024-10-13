import React from 'react';
import { Button, Container, styled, Box, ButtonGroup, Grid, Stack, Avatar, Typography } from '@mui/material';
import { CameraAlt, Collections, Ballot, ViewHeadline } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import CustomPage from '../components/CustomPage';

const Home: React.FC = () => {

  const history = useHistory();
  let changePage = (page: string) => {
      history.push('/' + page);
  }

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
            We're here to help elevate your movement together.
          </Typography>
        </Box>
        <Grid container sx={{ py: 5, px: 1 }} >
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            <Button variant="contained" startIcon={<Collections />} sx={{ width: '100%' }} onClick={() => changePage("upload")}>
              Upload
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ mb: 1, px: 1 }}>
            <Button variant="outlined" startIcon={<Ballot />} sx={{ width: '100%' }} onClick={() => changePage("results")}>
              Last Result
            </Button>
          </Grid>
        </Grid>
      </Container>
    </CustomPage>
  )
};

export default Home;