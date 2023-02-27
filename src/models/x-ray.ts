import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        required: true,
    },
    detectionURL: {
        type: String,
        required: true,
    },
    report: {
        type: String,
        required: true,
    },
    xRayDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Patient = mongoose.model('patients', patientSchema);
export default Patient;
