import mongoose from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            dentistId: mongoose.Schema.Types.ObjectId
        }
    }
}
