import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonContent } from '@ionic/react';

import Alert from './Alert';
import NavBar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

interface ComponentProps {
  children?: ReactNode;
}

const CustomPage: React.FC<ComponentProps> = ({ children = [] }: ComponentProps) => {
  
  const theme: any = createTheme({
    palette: {
      primary: {
        main: "#ae41e0",
      }
    },
    shape: {
      borderRadius: 5,
    }
  });

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <IonContent forceOverscroll={false}>
                { children }
                <Alert />
            </IonContent>
            <Footer />
        </Box>
    </ThemeProvider>
  )
}

export default CustomPage;