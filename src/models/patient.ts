import mongoose from 'mongoose';

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
};

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    middleName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    userName: {
        type: String,
    },
    gender: {
        type: Gender,
        required: true,
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 30,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
    },
    medicalHistory: {
        type: String,
    },
    dentalHistory: {
        type: String,
    },
    xRays: [{
        xrayId: {
            type: mongoose.Types.ObjectId,
            ref: 'XRays',
        },
    }],
}, { timestamps: true });

const Patient = mongoose.model('patients', patientSchema);
export default Patient;
