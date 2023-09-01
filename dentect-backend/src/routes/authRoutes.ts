import express from 'express';

import { signUp, signIn, verifyAccount, generateNewOTP } from '../controllers/authController';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/verifyAccount', verifyAccount);
router.post('/newOTP', generateNewOTP);

export default router;
