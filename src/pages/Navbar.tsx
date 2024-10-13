import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Link, Stack, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const NavBar: React.FC = () => {

    let location = useLocation();

    const history = useHistory();
    let changePage = () => {
        history.push('/');
    }
  
    return (
        <AppBar position='static' className='navbar' sx={{ height: '3rem' }}>
            
            <Toolbar className='navbar-tool' sx={{ width: "100%" }}>
                {location.pathname === '/' ? 
                    <Stack spacing={2} direction="row" sx={{ width: "100%", flexGrow: 1, alignItems: 'center' }}>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} />
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }}>
                            <img 
                                className='navbar-logo' 
                                src='https://picsum.photos/100' 
                                alt='logo'
                                onClick={() => console.log('logo clicked')}
                            />
                        </Box>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} />
                    </Stack>
                : 
                    <Stack spacing={2} direction="row" sx={{ width: "100%", flexGrow: 1, alignItems: 'center' }}>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'left' }}>
                            <IconButton onClick={() => changePage()}>
                                <KeyboardBackspaceIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }}>
                            <img 
                                className='navbar-logo' 
                                src='https://picsum.photos/100' 
                                alt='logo'
                                onClick={() => console.log('logo clicked')}
                            />
                        </Box>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} />
                    </Stack>
                }
                
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;

// const [navActive, setNavActive] = useState(false);

    // const toggleNav = () => {
    //   setNavActive(!navActive);
    // };
  
    // const closeMenu = () => {
    //   setNavActive(false);
    // };
  
    // useEffect(() => {
    //   const handleResize = () => {
    //     if (window.innerWidth <= 500) {
    //       closeMenu;
    //     }
    //   };
  
    //   window.addEventListener("resize", handleResize);
  
    //   return () => {
    //     window.removeEventListener("resize", handleResize);
    //   };
    // }, []);
  
    // useEffect(() => {
    //   if (window.innerWidth <= 1200) {
    //     closeMenu;
    //   }
    // }, []);