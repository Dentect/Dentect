import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
    dentistId: {
        type: mongoose.Types.ObjectId,
        ref: 'dentists',
    },
}, { timestamps: true });

const Feedback = mongoose.model('feedbacks', feedbackSchema);
export default Feedback;
