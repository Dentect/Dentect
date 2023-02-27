import mongoose from 'mongoose';

const dentistSchema = new mongoose.Schema({
    firstName: {
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
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    medicalId: {
        type: String,
        required: true,
    },
    clinicAddress: {
        type: String,
    },
    clinicPhone: {
        type: String,
    },
    patients: [{
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
    }],
}, { timestamps: true });

const Dentist = mongoose.model('dentists', dentistSchema);
export default Dentist;
