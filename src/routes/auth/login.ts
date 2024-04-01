import express from 'express';
import {login} from "../../controllers/auth";

const router = express.Router();

//USER LOGIN
router.post('/',  login);

export default router;