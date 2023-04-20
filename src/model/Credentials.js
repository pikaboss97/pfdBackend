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
    },
    facultad: {
        type: String,
        required: true,
    },
    ep: {
        type: String,
        required: true,
    },
    tc: {
        type: Number,
        required: true,
    },
    ca: {
        type: Number,
        required: true,
    },
    cm: {
        type: Number,
        required: true,
    },
    ea: {
        type: Number,
        required: true,
    },
    ala: {
        type: Number,
        required: true,
    }
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('credential', CredentialSchema);