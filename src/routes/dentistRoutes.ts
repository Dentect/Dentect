import express from 'express';

import validateToken from '../middlewares/validateToken';
import { addPatient, addFeedback, getPatient, editPatient } from '../controllers/dentistControllers';

const router = express.Router();

router.post('/patients', validateToken, addPatient);
router.post('/feedback', validateToken, addFeedback);
router.get('/patients/:patientClinicId', validateToken, getPatient);
router.patch('/patients/:patientClinicId', validateToken, editPatient);

export default router;
