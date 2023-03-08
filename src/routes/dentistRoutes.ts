import express from 'express';
// import validateToken from '../middlewares/validateToken';
import { addPatient, getPatient, editPatient } from '../controllers/dentistControllers';

const router = express.Router();

router.post('/:dentistId/patients', addPatient);
router.get('/:dentistId/patients/:patientName', getPatient);
router.patch('/:dentistId/patients/:patientName', editPatient);

export default router;
