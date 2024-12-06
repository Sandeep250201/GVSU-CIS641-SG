const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');
const Task = require('../models/Task');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User logged successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findByUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTeam = async (req, res) => {
    const { teamName, email, user } = req.body;

    try {
        const existingTeam = await Team.findOne({ teamName });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team already exists' });
        }

        const newTeam = new Team({ teamName, createdBy: user, members: user });
        await newTeam.save();

        const result = await User.updateMany(
            { email: { $in: user } },
            { $push: { team: teamName } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'No users updated. Please verify user emails.' });
        }

        return res.status(201).json({
            message: 'Team created and users added successfully',
            team: newTeam,
        });

    } catch (error) {
        console.error('Error creating team:', error);
        return res.status(500).json({
            message: 'Error creating team or adding users',
            error: error.message || 'Unknown error',
        });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({})

        if (teams.length === 0) {
            return res.status(200).json({
                message: 'No teams found',
                teams: [],
            });
        }

        return res.status(200).json({
            message: 'Teams fetched successfully',
            teams: teams,
        });
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        return res.status(500).json({
            message: 'Error in fetching teams',
            error: error.message,
        });
    }
};

exports.getTeamsByuser = async (req, res) => {
    try {
        const { user } = req.body
        const teams = await Team.find({
            $or: [
                { createdBy: user },
                { members: { $in: [user] } }
            ]
        });

        if (!teams) {
            return res.status(200).json({
                message: 'No teams found',
                teams: [],
            });
        }

        return res.status(200).json({
            message: 'Teams fetched successfully',
            teams: teams,
        });
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        return res.status(500).json({
            message: 'Error in fetching teams',
            error: error.message,
        });
    }
};

exports.addMembersInTeams = async (req, res) => {
    const { email } = req.body;
    try {
        const team = await Team.findOne({ teamName: req.query.teamName });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        if (!team.members.includes(email)) {
            const user = await User.findOne({ email: email })
            if (user) {
                team.members.push(email);
                await team.save();
                user.team.push(req.query.teamName)
                await user.save()
            } else {
                return res.status(400).json({ message: 'User does not exis' });
            }
            return res.status(200).json({ message: 'Member added successfully' });
        }
        return res.status(400).json({ message: 'User already a member of the team' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error in adding member to the team',
            error: error.message
        });
    }
};

exports.removeMember = async (req, res) => {
    const { email, memberEmail } = req.body;
    try {
        const team = await Team.findOne({ teamName: req.query.teamName });
        if (!team || team.createdBy !== email) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        team.members = team.members.filter(member => member !== memberEmail);
        await team.save();
        return res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.leaveTeam = async (req, res) => {
    const { email } = req.body;
    try {
        const team = await Team.findOne({ teamName: req.query.teamName });
        if (!team) {
            return res.status(403).json({ message: 'Not team found' });
        }
        team.members = team.members.filter(member => member !== email);
        await team.save();
        return res.status(200).json({ message: 'Member left successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { teamName, createdBy } = req.body;
        const team = await Team.findOne({ teamName });
        if (!team || team.createdBy !== createdBy) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await Task.deleteMany({ team: teamName });

        await User.updateMany(
            { team: teamName },
            { $pull: { team: teamName } }
        );

        await Team.deleteOne({ teamName });

        return res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.addNewTasks = async (req, res) => {
    const { title, description, assignedTo, teamName } = req.body;
    try {
        const task = new Task({ title, description, assignedTo, team: teamName })
        await task.save();
        res.status(201).json({ message: 'Task saved successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error in saving tasks',
            error: error.message
        });
    }
}

exports.displayTasks = async (req, res) => {
    try {
        const { teamName } = req.body
        const task = await Task.find({ team: teamName });
        if (!task) {
            return res.status(404).json({ message: 'Currently there are no updates in this team' });
        }
        return res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.displayAllTasks = async (req, res) => {
    try {
        const task = await Task.find({});
        if (!task) {
            return res.status(404).json({ message: 'Currently there are no updates in this team' });
        }
        return res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { taskId, newStatus } = req.body
    try {
        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(403).json({ message: 'Not task found' });
        }
        task.status = newStatus;
        await task.save();
        return res.status(200).json({ message: 'Task status successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}