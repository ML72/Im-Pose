import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Button, Container, Typography } from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Footer: React.FC = () => {
    const [value, setValue] = React.useState(0);
    console.log('Footer');

  return (
    <Box sx={{ 
        width: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "primary.main",
        minHeight: "3rem",
    }}>
        <Typography sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ color: 'black', fontWeight: "1000", fontSize: "2rem" }}>im</span>
            <span style={{ color: 'white', fontWeight: "1000", fontSize: "2rem" }}>pose</span>
        </Typography>
    </Box>
  )
};

export default Footer;