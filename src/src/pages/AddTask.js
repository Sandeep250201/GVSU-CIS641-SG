import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modalContent: {
        marginTop: '100px',
        padding: theme.spacing(4),
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
    },
    formField: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: '100%',
    },
}));

const AddTask = ({ open, handleClose, teams, currentuser }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        teamName: '',
    });
    useEffect(() => {
        if (teams) {
            setFormData(prevData => ({
                ...prevData,
                teamName: teams.teamName,
            }));
        }
    }, [teams]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/addNewTask', formData);
            alert('Task added successfully!');
            console.log(response.data);
            handleClose(); // Close the modal on success
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={classes.modalContent}>
                <Typography variant="h5" gutterBottom>
                    Add Task
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Task Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={classes.formField}
                        required
                    />
                    <TextField
                        label="Task Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={classes.formField}
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Team Name"
                        name="Team Name"
                        value={formData.teamName}
                        onChange={handleChange}
                        className={classes.formField}
                        rows={4}
                        aria-readonly
                    />
                    <FormControl variant="outlined" className={classes.formControl} sx={{ width: '100%', margin: '8px 0' }} required>
                        <InputLabel id="assignedTo-select-label">Assign to</InputLabel>
                        <Select
                            labelId="assignedTo-select-label"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                        >
                            {teams?.members?.map((member) => (
                                (member !== currentuser) &&
                                <MenuItem key={member} value={member}>
                                    {member}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Add Task
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddTask;
