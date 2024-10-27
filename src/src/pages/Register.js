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
        maxWidth: '200px', 
        backgroundColor: '#fff',
        padding: theme.spacing(4),
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    form: {
        width: '70%',
    },
    title: {
        marginBottom: '5px',
        textAlign: 'center',
    },
    formField: {
        marginBottom: '5px',
        width: '100%', 
    },
    loginLink: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
}));

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register', formData);
            console.log(res.data);
            if(res.data.message === 'User registered successfully') {
                navigate('/welcome', {state: {formData}});

            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box className={classes.root}>
            <Container className={classes.formContainer} style={{width:'500px'}}>
                <Typography variant="h4" className={classes.title}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formField}
                        value={formData.name}
                        onChange={handleChange}
                    />
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
                        Register
                    </Button>
                </form>
                <Box className={classes.loginLink}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link href="/login" color="primary">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;
