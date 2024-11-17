import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import backgroundImage from './background.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Smooth overlay
        zIndex: 1,
    },
    content: {
        zIndex: 2,
        textAlign: 'center',
        padding: theme.spacing(4),
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)', // Add depth
        color: '#333',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: theme.spacing(3),
        color: '#555',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
    },
    button: {
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: theme.spacing(1.5, 5),
        borderRadius: '30px',
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Button shadow
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <div className={classes.overlay}></div>
            <Box className={classes.content}>
                <Typography variant="h1" className={classes.title}>
                    Welcome to TeamUp!
                </Typography>
                <Typography variant="h5" className={classes.subtitle}>
                    Collaborate, manage, and succeed with your team efficiently
                </Typography>
                <Button
                    variant="contained"
                    className={classes.button}
                    href="/register"
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
