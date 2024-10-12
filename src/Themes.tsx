

/* Your CSS */
import { create } from '@mui/material/styles/createTransitions';
import './App.css';
import { createTheme } from '@mui/material';

const Themes: React.FC = () => {
    const themes = createTheme({
        palette: {
            background: {
              paper: '#fff',
            },
            text: {
              primary: '#173A5E',
              secondary: '#46505A',
            },
            action: {
              active: '#001E3C',
            },
          },
    });

  return (
    themes
  );
}

export default Themes;
