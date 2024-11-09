import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from '../styles/teams.css'
import { Box, Button, TextField } from '@mui/material';

const Teams = () => {
    const location = useLocation();
    const { selectedTeamData } = location.state;
    const [tasks, setTasks] = useState([])
    const [displayAllTasks, setDisplayAllTasks] = useState(false);
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [taskDialogClosed, setTaskDialogClose] = useState(false);
    const [taskData, setTaskData] = useState({title: '', description: '', status: '', assignedTo: selectedTeamData.email, team: selectedTeamData.teamName});

    const fetchTasks = async () => {
        const res = await axios.get(`http://localhost:5001/api/auth/displayAllTasks?team=${selectedTeamData.teamName}`);
        console.log('res', res.data);
        if (res.data.length > 0) {
            setDisplayAllTasks(true);
            setTasks(res.data)
        }
    }

    console.log('teamNam', selectedTeamData.teamName);

    useEffect(() => {
        fetchTasks();
    }, [selectedTeamData.teamName, tasks, taskData])

    const handleClose = () => {
        setTaskDialogClose(false);
        setTaskDialogOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/addNewTask', taskData);
            console.log('res', res.data);
            if (res.data.message === 'Task saved successfully') {
                setTaskDialogClose(false);
                await fetchTasks();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        setTaskDialogOpen(true);
        setTaskDialogClose(true);
    }

    return (
        <div>
            {displayAllTasks ? tasks.length > 0 && tasks.map((task) => {
                return (
                    <div>
                        <label>Title of the task: </label>
                        <span>{task.title}</span><br />
                        <label>Description: </label>
                        <span>{task.description}</span><br />
                        <label>Status: </label>
                        <span>{task.status}</span><br />
                        <label>AssignedTo: </label>
                        <span>{task.assignedTo}</span><br />
                    </div>
                )
            })
                : <div>No Tasks available to display</div>}

            {taskDialogOpen && taskDialogClosed ?
                (<Box className={classes.root}>
                    <div className={classes.overlay}></div>
                    <Box className={classes.content}>
                        <button onClick={handleClose}>X</button>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Title"
                                name="title"
                                className={classes.formField}
                                value={taskData.title}
                                onChange={handleChange}
                            />
                            <TextField
                                label="description"
                                name="description"
                                type="text"
                                className={classes.formField}
                                value={taskData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                label="status"
                                name="status"
                                type="text"
                                className={classes.formField}
                                value={taskData.status}
                                onChange={handleChange}
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
                : <div>
                    <button onClick={handleClick}>Post your Task</button>
                </div>}
        </div>
    )
}

export default Teams;