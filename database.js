const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://vega097:hQm4JURW9G2cLeKJ@miprogresoacademico.ogp0b64.mongodb.net/data?retryWrites=true&w=majority';

module.exports = () => {
    const connect = () => {
        mongoose.connect(DB_URI,{keepAlive: true,useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error(err));
    }
    connect();
}