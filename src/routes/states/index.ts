import express = require('express');
const router = express.Router();
const { getAllStates, addState, multipleState, getState } = require( "../../controllers/states/index");
//import {verifyToken} from "../../middleware/verifyToken";



router.post('/', addState).get('/', getAllStates).post("/multiple", multipleState).get("/:name", getState)
module.exports = router;