import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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

const TeamForm = ({ open, handleClose, formType, onSuccess, user, team }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({ teamName: '', email: '', user: user });
    const [allTeams, setAllTeams] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchAllteams = async () => {
            const response = await axios.post("http://localhost:5001/api/auth/teams")
            setAllTeams(response.data.teams)
        }
        fetchAllteams()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (formType === 'create') {
                response = await axios.post('http://localhost:5001/api/auth/team', formData);
            } else if (formType === 'join') {
                response = await axios.put(`http://localhost:5001/api/auth/joinTeam?teamName=${formData.teamName}`, { email: formData.email });
            }
            if (response.status === 201 || response.status === 200) {
                onSuccess(response.data);
                handleClose();
            }
        } catch (error) {
            alert(error.response.data.message)
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={classes.modalContent}>
                <Typography variant="h5" gutterBottom>
                    {formType === 'create' ? 'Create Team' : 'Join Team'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {formType === 'join' ? (
                        <FormControl className={classes.formControl} sx={{ width: '100%', margin: '8px 0' }}>
                            <InputLabel id="teamName-select-label">Team Name</InputLabel>
                            <Select
                                labelId="teamName-select-label"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleChange}
                                required
                            >
                                {allTeams?.map((member) => (
                                    <MenuItem key={member?.teamName} value={member?.teamName}>
                                        {(member.createdBy === user) ? member?.teamName : member?.teamName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            label="Team Name"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            className={classes.formField}
                            required
                        />
                    )}
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={classes.formField}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {formType === 'create' ? 'Create Team' : 'Join Team'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default TeamForm;
