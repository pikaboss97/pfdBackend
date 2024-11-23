const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userCode: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    faculty: {
        type: String
    }
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('auth', AuthSchema);