const express = require('express');
import { sendOTPController } from '../../controllers/OTP/index';

const router = express.Router();

//USER LOGIN
router.post('/', sendOTPController);

module.exports = router;
