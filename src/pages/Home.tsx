import React from 'react';
import { Button, Container, styled, Box, ButtonGroup, Grid, Stack, Avatar, Typography } from '@mui/material';
import { CameraAlt, Collections, Ballot } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import CustomPage from '../components/CustomPage';

const Home: React.FC = () => {

    const history = useHistory();
    let changePage = (page: string) => {
        history.push('/' + page);
    }

    return (
        <CustomPage>
            <Container maxWidth="sm" sx={{ paddingY: "1rem", paddingX: "1rem", marginY: "1rem"}}>
                <Box sx={{ px: 10 }}>
                    <img src="/img/undraw_workout_gcgu.svg"/>
                </Box>
                <Typography variant="body1" sx={{ pt: 5, px: 2 }}>
                    Welcome to Impose! We're here to help elevate your practice together.
                </Typography>
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