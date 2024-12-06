import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Card, CardContent, Grid, CircularProgress, Button, Box, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Navbar from './Navbar';
import TeamForm from './TeamForm';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from './AddTask';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(2),
    },
    card: {
        marginBottom: theme.spacing(2),
    },
    loading: {
        textAlign: 'center',
        marginTop: theme.spacing(4),
    },
    memberList: {
        marginTop: theme.spacing(2),
    },
    memberItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
    },
    taskCard: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)', // Light gradient
        borderRadius: '12px',
        boxShadow: theme.shadows[3],
    },
    taskTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    taskDescription: {
        fontSize: '0.9rem',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
    taskDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    taskStatus: {
        fontWeight: 'bold',
        color: theme.palette.success.main,
    },
    taskAssignedTo: {
        fontWeight: 'bold',
        color: theme.palette.info.main,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const [team, setTeamsData] = useState();
    const [tasks, setTasksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCreateTeam, setOpenCreateTeam] = useState(false);
    const [openJoinTeam, setOpenJoinTeam] = useState(false);
    const [openAddTask, setOpenAddTask] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state.formData.email;

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.post('http://localhost:5001/api/auth/teamsByuser', { user: user });
                setTeamsData(response.data.teams[0]);
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const handleOpenCreateTeam = () => setOpenCreateTeam(true);
    const handleOpenJoinTeam = () => setOpenJoinTeam(true);
    const handleAddTask = () => setOpenAddTask(true);
    const handleCloseForms = () => {
        setOpenCreateTeam(false);
        setOpenJoinTeam(false);
        setOpenAddTask(false);
    };

    const handleLogout = () => {
        navigate('/login');
        // console.log('Logged out');
    };

    const handleFormSuccess = (data) => {
        setTeamsData((prev) => (prev ? [...prev, data.team] : [data.team]));
    };

    const handleJoinTeam = async (teamName) => {
        try {
            await axios.put(`http://localhost:5001/api/auth/joinTeam?teamName=${teamName}`, { user });
            alert('Successfully joined team!');
        } catch (error) {
            console.error('Error joining team:', error);
        }
    };

    const handleRemoveMember = async (teamName, memberEmail) => {
        try {
            await axios.put(`http://localhost:5001/api/auth/removeMember?teamName=${teamName}`, { email: user, memberEmail: memberEmail });
            alert('Member removed successfully!');
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

    const handleLeaveTeam = async (teamName, memberEmail) => {
        try {
            await axios.put(`http://localhost:5001/api/auth/leaveTeam?teamName=${teamName}`, { email: memberEmail });
            alert('Member left successfully!');
        } catch (error) {
            console.error('Error leaving team:', error);
        }
    };

    const handleDeleteTeam = async (teamName, createdBy) => {
        try {
            await axios.post(`http://localhost:5001/api/auth/deleteTeam`, { teamName: teamName, createdBy: createdBy });
            alert('Team deleted successfully!');
            setTeamsData((prev) => prev?.filter((team) => team.teamName !== teamName));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            await axios.put(`http://localhost:5001/api/auth/updateTaskStatus`, { taskId, newStatus });
            setTasksData((prev) => prev?.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleGetAllTasks = async (teamName) => {
        try {
            const response = await axios.post(`http://localhost:5001/api/auth/displayTasks`, { teamName: teamName });
            setTasksData(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        handleGetAllTasks(team?.teamName);
    }, [team]);

    return (
        <div className={classes.root}>
            <Navbar onLogout={handleLogout} onJoinTeam={handleOpenJoinTeam} onCreateTeam={handleOpenCreateTeam} createTeam={team?.createdBy === user || false} memebr={team?.members?.includes(user)} />
            {loading ? (
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={2}>
                    {team && (
                        <Grid item xs={12} sm={6} md={4} lg={3} margin='20px' key={team._id}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5">{team.teamName}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {team.members?.length} members
                                    </Typography>

                                    <div className={classes.memberList}>
                                        <Typography variant="subtitle1">Members:</Typography>
                                        {team.members?.map((member) => (
                                            <div key={member} className={classes.memberItem}>
                                                <Typography variant="body2">{member}</Typography>
                                                {(team.createdBy === user && member !== user) && (
                                                    <DeleteIcon onClick={() => handleRemoveMember(team.teamName, member)} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1">Tasks</Typography>
                                        <br />
                                        <Box>
                                            <Grid container spacing={2}>
                                                {tasks.map((task) => (
                                                    <Grid item xs={18} sm={12} md={12} key={task._id}>
                                                        <Card className={classes.taskCard}>
                                                            <Typography className={classes.taskTitle}>{task.title}</Typography>
                                                            <Typography className={classes.taskDescription}>{task.description}</Typography>
                                                            <div className={classes.taskDetails}>
                                                                {team.createdBy === user ? (
                                                                    <>
                                                                        <Typography className={classes.taskStatus}>{task.status}</Typography>
                                                                        <Typography className={classes.taskAssignedTo}>{task.assignedTo}</Typography>
                                                                    </>
                                                                ) : (task.assignedTo === user ? (

                                                                    <Box display="flex" alignItems="center">
                                                                        <Select
                                                                            value={task.status}
                                                                            onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                                                                            displayEmpty
                                                                        >
                                                                            <MenuItem value="to-do">To Do</MenuItem>
                                                                            <MenuItem value="in-progress">In Progress</MenuItem>
                                                                            <MenuItem value="done">Done</MenuItem>
                                                                        </Select>
                                                                        <Typography className={classes.taskAssignedTo} style={{ marginLeft: '10px' }}>{task.assignedTo}</Typography>
                                                                    </Box>
                                                                ) : (
                                                                    <Typography className={classes.taskAssignedTo}> AssignedTo: {task.assignedTo}</Typography>
                                                                )
                                                                )}
                                                            </div>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </div>

                                    {!(team.createdBy === user || !team.members?.includes(user)) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleLeaveTeam(team.teamName, user)}
                                        >
                                            Leave Team
                                        </Button>
                                    )}

                                    {team.createdBy === user && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteTeam(team.teamName, team.createdBy)}
                                            >
                                                Delete Team
                                            </Button>
                                            <span>  </span>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAddTask(team.teamName)}
                                            >
                                                Add Task
                                            </Button>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            )}
            <TeamForm open={openCreateTeam} handleClose={handleCloseForms} user={user} formType="create" onSuccess={handleFormSuccess} />
            <TeamForm open={openJoinTeam} handleClose={handleCloseForms} user={user} formType="join" onSuccess={handleFormSuccess} teamNames={team} />
            <AddTask open={openAddTask} handleClose={handleCloseForms} user={user} onSuccess={handleFormSuccess} teams={team} currentuser={team?.createdBy} />
        </div>
    );
};

export default Dashboard;
