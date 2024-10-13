import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';


const Navbar: React.FC = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Logo"
            src="/favicon.png"
            sx={{ display: 'flex', mr: 1.5, borderRadius: "0" }}
          />
          <Typography sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ color: '#4F2144', fontWeight: "1000", fontSize: "2rem" }}>im</span>
            <span style={{ color: '#F6C5DA', fontWeight: "1000", fontSize: "2rem" }}>pose</span>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;