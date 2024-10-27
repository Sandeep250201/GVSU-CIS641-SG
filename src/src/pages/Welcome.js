import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Card, CardContent } from '@mui/material';
import axios from 'axios';
import styles from '../styles/welcome.css'

const useStyles = makeStyles((theme) => ({
    button1: {
        color: 'red',
        margin: '20px'
    },
    root: {
        height: '100vh',
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
    formField: {
        marginBottom: '5px',
        width: '100%',
    },
    loginLink: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    joinTeamContent: {
        border: '2px solid red',
        backgroundColor: 'lightgray',
        position: 'relative !important',
        height: 'auto !important'
    }
}));

const Welcome = () => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const { formData } = location.state;
    const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
    const [isJoinTeamDialogOpen, setJoinTeamDialogOpen] = useState(false);
    const [closeDialog, setCloseDialog] = useState(false);
    const [data, setData] = useState({ teamName: '', email: formData.email });
    const [teamsData, setTeamsData] = useState([]);
    const [selectedTeamData, setSelectedTeamData] = useState({teamName: '', email: formData.email});

    const handleClick = () => {
        setCreateTeamDialogOpen(true);
        setCloseDialog(true);
    }

    const handleClose = () => {
        setCreateTeamDialogOpen(false);
        setCloseDialog(false);
        setJoinTeamDialogOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/team', data);
            console.log(res.data);
            if (res.data.message === 'Team created and users added successfully') {
                setCloseDialog(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const joinClickButton = async () => {
        setJoinTeamDialogOpen(true);
        try {
            const res = await axios.get('http://localhost:5001/api/auth/teams');
            setTeamsData(res.data.teams);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCheckBox = async (e) => {
        const { name, value } = e.target;
        setSelectedTeamData({ ...selectedTeamData, [name]: value });
    }

    const handleJoinTeam = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5001/api/auth/joinTeam?teamName=${selectedTeamData.teamName}`, selectedTeamData)
            if(res.data.message === 'Member added successfully') {
                navigate('/teams', {state: {selectedTeamData}});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {isCreateTeamDialogOpen && closeDialog ?
                (<Box className={classes.root}>
                    <div className={classes.overlay}></div>
                    <Box className={classes.content}>
                        <button onClick={handleClose}>X</button>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Team Name"
                                name="teamName"
                                className={classes.formField}
                                value={data.teamName}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                className={classes.formField}
                                value={formData.email}
                                disabled={true}
                            />
                            <Button
                                variant="contained"
                                className={classes.button}
                                type="submit"
                            >
                                create team
                            </Button>
                        </form>
                    </Box>
                </Box>)
                : <button className={classes.button1} onClick={handleClick}>Create Team</button>
            }

            {isJoinTeamDialogOpen ? (
                teamsData.length > 0 ? (
                    <div>
                        <button onClick={handleClose}>X</button>
                    <ul className={styles.teamList}>
                        {teamsData.map((teamData) => {
                            return (
                                <div>
                                    <form onSubmit={handleJoinTeam}>
                                    <li key={teamData._id} className={styles.listItem}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <label className={classes.teamLabel}>
                                                    <input
                                                        type="checkbox"
                                                        className={classes.checkbox}
                                                        name="teamName"
                                                        value={teamData.teamName}
                                                        onChange={handleCheckBox}
                                                    />
                                                    <span className={classes.teamName}>
                                                        {teamData.teamName}
                                                    </span>
                                                </label>
                                            </CardContent>
                                        </Card>
                                    </li>
                                    <button type='submit'>Join</button>
                                    </form>
                                </div>
                            );
                        })}
                    </ul>
                    </div>
                ) : (
                    <div>No teams available to join</div>
                )
            ) : (
                <button onClick={joinClickButton}>Join Team</button>
            )}
        </div>
    );
};

export default Welcome;
