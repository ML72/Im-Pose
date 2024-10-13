import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonContent } from '@ionic/react';

import Alert from './Alert';
import NavBar from '../pages/Navbar';

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

//   const themes = createTheme({
//     palette: {
//         background: {
//           paper: '#fff',
//         },
//         text: {
//           primary: '#173A5E',
//           secondary: '#46505A',
//         },
//         action: {
//           active: '#001E3C',
//         },
//       },
// });

  return (
    <ThemeProvider theme={theme}>
        <NavBar />
      <IonContent forceOverscroll={false}>
        { children }
        <Alert />
      </IonContent>
    </ThemeProvider>
  )
}

export default CustomPage;