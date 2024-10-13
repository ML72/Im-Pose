import React from 'react';
import { Box, Typography } from '@mui/material';


const Footer: React.FC = () => {
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