import express from 'express';

import validateToken from '../middlewares/validateToken';
import { upload, uploadImage } from '../middlewares/imageStorage';
import { addPatientXray, getPatientXrays } from '../controllers/patientController';

const router = express.Router();

router.post('/:patientClinicId/xrays', validateToken, upload.single('xray'), uploadImage, addPatientXray);
router.get('/:patientClinicId/xrays', validateToken, getPatientXrays);

export default router;
