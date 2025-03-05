import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(15 23 42)',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Courier New, Poppins, Roboto, sans-serif',
    h1: {
      fontWeight: 500,
      color: '#ffca00',
      fontFamily: 'arial',
    },
    navlink:{
        fontSize: '0.9rem', 
        cursor: 'pointer', 
        "&:hover":{color:"#00bcd4"}
    },
    body:{
        fontSize: '1.0rem',
    }
  },
});

export default theme;
