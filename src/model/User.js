const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    DNI: {
        type: Date,
        required: false,
    },
    fechaIngreso: {
        type: String,
        required: false,
    },
    modoIngreso: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    celular: {
        type: String,
        required: true,
    },
    distrito: {
        type: String,
        required: false,
    },
    provincia: {
        type: String,
        required: false,
    },
    departamento: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    referencia: {
        type: String,
        required: false,
    },
    deescription: {
        type: String,
        required: false,
    },
    idFacultad: {
        type: mongoose.Schema.ObjectId, 
        ref: 'facultad',
        required: false,
    },
    idCurricula: {
        type: mongoose.Schema.ObjectId, 
        ref: 'curricula',
        required: false,
    },
    idRecord: {
        type: mongoose.Schema.ObjectId, 
        ref: 'record',
        required: false,
    },
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('user', UserSchema);