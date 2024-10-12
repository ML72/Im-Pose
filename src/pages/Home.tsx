import React from 'react';
import { Button, Container, styled, Box, ButtonGroup } from '@mui/material';

import CustomPage from '../components/CustomPage';
import NavBar from './Navbar';
import Footer from './Footer';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Home: React.FC = () => {
  
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

  return (
    <CustomPage>
      <NavBar />

      <Container className='home-button-container' maxWidth="sm">
        <ButtonGroup 
            orientation='vertical'
            className='home-button-group'
            variant='outlined'
        >
            <Button className='home-button' onClick={() => console.log("clicked")}>
                Camera
            </Button>
            <Button className='home-button'>
                Album
            </Button>
            <Button className='home-button'>
                History & Stats
            </Button>
        </ButtonGroup>

        {/* <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button> */}
      </Container>

      {/* <Footer /> */}
    </CustomPage>
  )
};

export default Home;