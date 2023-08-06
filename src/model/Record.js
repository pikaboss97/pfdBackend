const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    Facultad: {
        type: String,
        required: true,
    },
    EscuelaProfesional: {
        type: String,
        required: true,
    },
    Alumno: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true,
        unique: true,
    },
    year:{
        type:String,
        required: true,
    },
    TC: {
        type: Number,
        required: true,
    },
    CA: {
        type: Number,
        required: true,
    },
    CM: {
        type: Number,
        required: true,
    },
    EC: {
        type: Number,
        required: true,
    },
    PPP: {
        type: String,
        required: true,
    },
    Asignaturas: [{
        nombre: {
            type: String,
            required: true,
        },
        codigo: {
            type: String,
            required: true,
        },
        creditos: {
            type: Number,
            required: true,
        },
        electivo: {
            type: Boolean,
            required: true,
        },
        aprobado: {
            type: Boolean,
            required: true,
        },
        nota: {
            type: Array,
            required: true,
        },
        matriculado: {
            type: Boolean,
            required: true,
        },
    }],
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('record', RecordSchema);