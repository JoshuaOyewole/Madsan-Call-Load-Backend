import express from 'express';
import { resetPWD } from '../../controllers/forgot_password/index';

const router = express.Router();

//RESET PASSWORD
router.post('/', resetPWD);

export default router;
