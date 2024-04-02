const express = require('express');
import { resetPWD } from '../../controllers/forgot_password/index';

const router = express.Router();

//RESET PASSWORD
router.post('/', resetPWD);

module.exports = router;
