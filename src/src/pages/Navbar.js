import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Group from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#1976d2',
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
    },
    button: {
        color: '#fff',
        marginLeft: theme.spacing(2),
    },
}));

const Navbar = ({ onJoinTeam, onCreateTeam, onLogout, createTeam, member = false }) => {

    const location = useLocation();
    const [teams, setTeamsData] = useState([])
    const user = location.state.user
    const fetchTeams = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/auth/teamsByuser', { user: user });
            setTeamsData(response.data.teams[0]);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    useEffect(() => {
        fetchTeams()
    }, [])
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>
                <div className={classes.title}>
                    <HomeIcon />
                    <Typography variant="h6" component="div">
                        Team Management
                    </Typography>
                </div>
                {!createTeam ? (<>
                    <Tooltip title="Create Team" arrow>
                        <IconButton edge="start" className={classes.button} color="inherit" onClick={onCreateTeam}>
                            <Group />
                        </IconButton>
                    </Tooltip>
                    {
                        !(member) &&
                        <Tooltip title="Join Team" arrow>
                            <IconButton edge="end" className={classes.button} color="inherit" onClick={onJoinTeam}>
                                <GroupAddIcon />
                            </IconButton>
                        </Tooltip>
                    }

                </>
                ) :
                    <Tooltip title="Add member" arrow>
                        <IconButton edge="end" className={classes.button} color="inherit" onClick={onJoinTeam}>
                            <GroupAddIcon />
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title="Logout" arrow>
                    <Button color="inherit" onClick={onLogout}>
                        <LogoutIcon />
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
