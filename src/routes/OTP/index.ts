import express from 'express';
import { sendOTPController } from '../../controllers/OTP/index';

const router = express.Router();

//USER LOGIN
router.post('/', sendOTPController);

export default router;
