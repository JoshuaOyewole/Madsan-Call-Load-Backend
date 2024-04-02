import express from 'express';
const router = express.Router();
import login from "../../controllers/auth/index"


//USER LOGIN
router.post('/', login);

export default router;