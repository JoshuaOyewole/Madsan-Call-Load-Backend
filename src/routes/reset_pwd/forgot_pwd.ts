const express = require('express');
import {forgetPWD} from '../../controllers/forgot_password/index';

const router = express.Router();

//FORGOTTEN PASSWORD
router.post('/', forgetPWD);
module.exports = router;
