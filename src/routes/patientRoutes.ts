import express from 'express';
// import validateToken from '../middlewares/validateToken';
import { upload, uploadImage } from '../middlewares/imageStorage';
import { addPatientXray, getPatientXrays } from '../controllers/patientController';

const router = express.Router();

router.post('/:patientId/xrays', upload.single('xray'), uploadImage, addPatientXray);
router.get('/:patientId/xrays', getPatientXrays);

export default router;
