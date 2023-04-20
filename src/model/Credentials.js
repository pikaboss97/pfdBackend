const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('credential', CredentialSchema);