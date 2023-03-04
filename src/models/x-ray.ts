import mongoose from 'mongoose';

const xraySchema = new mongoose.Schema({
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
    xrayDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Xray = mongoose.model('xrays', xraySchema);
export default Xray;
