import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import backgroundImage from './background.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        color: '#fff',
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
        height: '300px',
        zIndex: 1,
        textAlign: 'center',
        alignContent: 'center',
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backdropFilter: 'blur(5px)',
        background: 'white',
        color: 'black',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
        },
    },
    subtitle: {
        fontSize: '1.75rem',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.3rem',
        },
    },
    button: {
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: theme.spacing(1.5, 4),
        borderRadius: '25px',
        fontSize: '1.2rem',
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
