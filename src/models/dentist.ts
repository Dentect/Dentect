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
    userName: {
        type: String,
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    OTP: {
        type: String,
    },
    OTPCreationTime: {
        type: Date,
    },
    yearsOfExperience: {
        type: Number,
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
        patientId: {
            type: mongoose.Types.ObjectId,
            ref: 'Patient',
        },
        patientName: String,
        patientClinicId: Number,
    }],
}, { timestamps: true });

const Dentist = mongoose.model('dentists', dentistSchema);
export default Dentist;
