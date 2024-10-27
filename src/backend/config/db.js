const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://username:ATdXpA4oWwMDpUv6@team-management-db.yp39g.mongodb.net/?retryWrites=true&w=majority&appName=team-management-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports = connectDB;
