import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonContent } from '@ionic/react';

import Alert from './Alert';
import NavBar from './Navbar';
import { Box } from '@mui/material';

interface ComponentProps {
  children?: ReactNode;
}

const CustomPage: React.FC<ComponentProps> = ({ children = [] }: ComponentProps) => {
  
  const theme: any = createTheme({
    palette: {
      primary: {
        main: "#C9458A"
      },
      secondary: {
        main: "#F6C5DA"
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
        </Box>
    </ThemeProvider>
  )
}

export default CustomPage;