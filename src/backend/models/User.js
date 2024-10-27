const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['leader', 'member'], default: 'member' },
    team: [{ type: String, ref: 'Team' }]
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
