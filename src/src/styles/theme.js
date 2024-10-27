import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
        },
    },
});

export default theme;