const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['to-do', 'in-progress', 'done'], default: 'to-do' },
    assignedTo: { type: String, ref: 'User' },
    team: { type: String, ref: 'Team' },
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema);
