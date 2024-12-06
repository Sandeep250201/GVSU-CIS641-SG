const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true, unique: true },
    members: [{ type: String, ref: 'User' }],
    createdBy: { type: String, ref: 'User' },
}, { timestamps: true });
module.exports = mongoose.model('Team', teamSchema);
