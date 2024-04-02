const express = require('express');
const { getAllOrders, updateOrder, makeOrder, getOrder } = require( "../../controllers/orders");
//import {verifyToken} from "../../middleware/verifyToken";

const router = express.Router();

router.post('/', makeOrder).get('/', getAllOrders).put("/", updateOrder).get("/single", getOrder);

module.exports = router;