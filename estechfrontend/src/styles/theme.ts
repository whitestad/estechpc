import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    actayWide: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    actayWide?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    actayWide: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#C4F230',
      contrastText: '#111111',
    },
    secondary: {
      main: '#FF407D',
      contrastText: '#ffffff',
    },
    background: {
      default: '#151515',
      paper: '#000000',
    },
    text: {
      primary: '#fff',
      secondary: '#c2c2c2',
    },
    info: {
      main: '#307ef2',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
    h1: {
      fontFamily: 'ActayWide, sans-serif',
    },
    h2: {
      fontFamily: 'ActayWide, sans-serif',
    },
    h3: {
      fontFamily: 'ActayWide, sans-serif',
    },
    h4: {
      fontFamily: 'ActayWide, sans-serif',
    },
    h5: {
      fontFamily: 'ActayWide, sans-serif',
    },
    h6: {
      fontFamily: 'ActayWide, sans-serif',
    },
    actayWide: {
      fontFamily: 'ActayWide, sans-serif',
    },
  },
});

export default theme;
