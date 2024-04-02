const express = require('express');
import {login} from "../../controllers/auth/index";

const router = express.Router();

//USER LOGIN
router.post('/',  login);

module.exports = router;