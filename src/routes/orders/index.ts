import express from 'express';
import { getAllOrders, updateOrder, makeOrder, getOrder } from "../../controllers/orders";
//import {verifyToken} from "../../middleware/verifyToken";

const router = express.Router();

router.post('/', makeOrder).get('/', getAllOrders).put("/", updateOrder).get("/:id", getOrder);

export default router;