import React, { useEffect, useState } from 'react';
import { AppBar, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';


const NavBar: React.FC = () => {
  
    return (
        <AppBar position='static' className='navbar'>
            <Toolbar className='navbar-tool'>
                <img 
                    className='navbar-logo' 
                    src='https://picsum.photos/100' 
                    alt='logo'
                    onClick={() => console.log('logo clicked')}
                />
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