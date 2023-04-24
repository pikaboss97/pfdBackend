require('dotenv').config();
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI;

module.exports = () => {
    const connect = () => {
        mongoose.connect(DB_URI,{keepAlive: true,useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error(err));
    }
    connect();
}