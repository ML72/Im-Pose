import React from 'react';
import { Button, Container, styled, Box, ButtonGroup, Stack, ButtonBase, Avatar, Typography } from '@mui/material';

import CustomPage from '../components/CustomPage';
import NavBar from './Navbar';
import Footer from './Footer';

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const Home: React.FC = () => {
  
    const HomeButton = styled(Avatar)(({ theme }) => ({
        fontSize: "20px",
        position: 'relative',
        width: "6rem",
        height: "6rem",
    }));

    const HomeBox = styled(ButtonGroup)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }));

  return (
    <CustomPage>
      <NavBar />

      <Container maxWidth="sm" sx={{ paddingY: "1rem", paddingX: "1rem", marginY: "1rem"}}>

        <Stack spacing={24} justifyContent="center" alignItems="center" >
            <HomeBox>
                <HomeButton onClick={() => console.log("clicked")}>
                    <CameraAltOutlinedIcon />
                </HomeButton>
                <Typography>
                    Take a photo/video!
                </Typography>
            </HomeBox>

            <HomeBox>
                <HomeButton onClick={() => console.log("clicked")}>
                    <CollectionsOutlinedIcon />
                </HomeButton>
                <Typography>
                    See past photos/videos!
                </Typography>
            </HomeBox>

            <HomeBox>
                <HomeButton onClick={() => console.log("clicked")}>
                    <InsertChartOutlinedIcon />
                </HomeButton>
                <Typography>
                    See stats!
                </Typography>
            </HomeBox>
        </Stack>

      </Container>

      {/* <Footer /> */}
    </CustomPage>
  )
};

export default Home;