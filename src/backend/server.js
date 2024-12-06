const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.ejo2i.mongodb.net/Team_Management?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        // serverSelectionTimeoutMS: 5000,
        // socketTimeoutMS: 45000,
        // maxPoolSize: 10
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
app.use(express.json());
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
