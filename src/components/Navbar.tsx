import React from 'react';
import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { useHistory, useLocation } from 'react-router';

import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import Logo from './Logo';


const NavBar: React.FC = () => {

    let location = useLocation();

    const history = useHistory();
    let changePage = () => {
        history.push('/');
    }
  
    return (
        <AppBar position='static' className='navbar' sx={{ height: '3rem', backgroundColor: 'transparent' }}>
            
            <Toolbar className='navbar-tool' sx={{ width: "100%" }}>
                {location.pathname === '/' ? 
                    <Stack spacing={2} direction="row" sx={{ width: "100%", flexGrow: 1, alignItems: 'center' }}>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} />
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} >
                            <Logo />
                        </Box>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'center' }} />
                    </Stack>
                : 
                    <Stack spacing={2} direction="row" sx={{ width: "100%", flexGrow: 1, alignItems: 'center' }}>
                        <Box sx={{ flex:1, display: 'flex', justifyContent: 'left' }}>
                            <IconButton onClick={() => changePage()}>
                                <ChevronLeftSharpIcon />
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