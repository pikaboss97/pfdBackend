const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    studentCode: {
        type: String,
        required: true,
    },
    documentNumber: {
        type: Date,
        required: false,
    },
    professionalSchool: {
        type: String,
        required: false,
    },
    studyPlan: {
        type: String,
        required: false,
    },
    studyPlanCode: {
        type: String,
        required: false,
    },
    ingressDate: {
        type: String,
        required: false,
    },
    ingressMode: {
        type: String,
        required: false,
    },
    personalEmail: {
        type: String,
        required: false,
    },
    institutionalEmail: {
        type: String,
        required: false,
    },
    studentImage: {
        type: String,
        required: false,
    },
    primaryCellphone: {
        type: String,
        required: true,
    },
    emergencyCellphone: {
        type: String,
        required: false,
    },
    province: {
        type: String,
        required: false,
    },
    state: {
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
    reference: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('user', UserSchema);