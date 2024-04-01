import express from 'express';
import {forgetPWD} from '../../controllers/forgot_password/index';

const router = express.Router();

//FORGOTTEN PASSWORD
router.post('/', forgetPWD);
export default router;
