const express = require('express');
const { registerUser, loginUser, findByUserDetails, createTeam, getTeams, addMembersInTeams, addNewTasks, displayAllTasks } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
