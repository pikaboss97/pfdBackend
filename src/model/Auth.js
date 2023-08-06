const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'user',
        required: true,
    },
    userCode: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userToken: {
        type: String,
        required: true,
    },
    loginDate: {
        type: Date,
        required: true,
    },

},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('auth', AuthSchema);