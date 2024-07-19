import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Manrope, Roboto, Arial, sans-serif',
        h1: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
        h2: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
        h3: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
        h4: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
        h5: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
        h6: {
            fontFamily: 'ActayWide, Arial, sans-serif',
        },
    },
    palette: {
        primary: {
            main: '#ff1e63',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </React.StrictMode>,
)
