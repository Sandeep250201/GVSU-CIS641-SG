const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
