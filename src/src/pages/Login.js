import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #33bfff, #55881b)',
    },
    formContainer: {
        width: '100%',
        height: '250px',
        maxWidth: '300px',
        backgroundColor: '#fff',
        padding: '5px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: theme.spacing(5),
        textAlign: 'center',
    },
    formField: {
        marginBottom: '5px',
        gap: '5px',
        width: '100%',
    },
    registerLink: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
}));

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            console.log(res.data);
            if (res.data.message === 'User logged successfully') {
                navigate('/welcome', { state: { formData } });
            }
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
        }
    };

    return (
        <Box className={classes.root}>
            <Container className={classes.formContainer} style={{ width: '500px' }}>
                <Typography variant="h4" className={classes.title}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        className={classes.formField}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        className={classes.formField}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>
                </form>
                <Box className={classes.registerLink}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/register" color="primary">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
