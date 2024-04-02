import express from 'express';
import { getAllStates, addState, multipleState, getState } from "../../controllers/states/index";
//import {verifyToken} from "../../middleware/verifyToken";

const router = express.Router();

router.post('/', addState).get('/', getAllStates).post("/multiple", multipleState).get("/:name", getState)

export default router;