import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const createError = require("../../util/error");
import OrderModel from "../../models/orders";


async function makeOrder(req: Request, res: Response, next: NextFunction) {

    const { buyerCompanyName, email, sellerCompanyState, sellerCompanyName, pickupStateAddress, buyerDestination, quantity, productAmount, totalCost, sellerCompanyId, buyerCompanyId } = req.body;

    try {
        // If incomplete data is sent, return 400 Not Found
        if (!buyerCompanyName || !email || !sellerCompanyState || !sellerCompanyName || !pickupStateAddress || !buyerDestination || !quantity || !productAmount || !sellerCompanyId || !totalCost) {
            return res.status(StatusCodes.BAD_REQUEST).json({ data: { message: 'Some required fields are missing!' } });
        }
        else {
            //let prooduct_totalCost = parseInt(quantity) * parseInt(productAmount);

            const newOrder = await OrderModel.create({ buyerCompanyName, email, sellerCompanyState, sellerCompanyName, pickupStateAddress, buyerDestination, quantity, totalCost, productAmount, sellerCompanyId, buyerCompanyId });


            return res.status(StatusCodes.OK).json({ data: { id: newOrder._id, message: `Purchase Successfull!` } })
        }


    } catch (error: any) {
        // Handle server errors
        console.error('Error making Order:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))

    }
}
async function getOrder(req: Request, res: Response, next: NextFunction) {

    const { id } = req.query;

    try {
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Kindly enter a valid Order Id' });
        }
        const orders = await OrderModel.findById({ _id: id });
        // If order is not found, return 404 Not Found
        if (!orders || orders.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Order was found' });
        }
        // If order is found, return it
        return res.status(StatusCodes.OK).json({ data: orders })
    } catch (error) {
        // Handle server errors
        console.error('Error fetching Orders:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }
}
async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            buyerCompanyName,
            buyerCompanyId,
            email,
            sellerCompanyState,
            sellerCompanyName,
            pickupStateAddress,
            buyerDestination,
            quantity,
            productAmount,
            buyerPhoneNumber,
            sellerCompanyId,
            totalCost,
            id
        } = req.body;

        const updateData = {
            buyerCompanyName,
            buyerCompanyId,
            email,
            sellerCompanyState,
            sellerCompanyName,
            pickupStateAddress,
            buyerDestination,
            quantity,
            productAmount,
            buyerPhoneNumber,
            sellerCompanyId,
            totalCost,
            id
        }
        if (!id) {
            return res.status(StatusCodes.OK).json({ message: "Kindly provide a valid ID" })
        }

        // Update the order document by ID
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateData, { new: true });

        // Check if the order exists and was updated successfully
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // If the order was successfully updated, send the updated order object as response
        res.json({ message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        console.error('Error updating Order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await OrderModel.find();

        // If order is not found, return 404 Not Found
        if (orders.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Order was found' });
        }
        // If order is found, return it
        return res.status(StatusCodes.OK).json({ data: orders })
    } catch (error) {
        // Handle server errors
        console.error('Error fetching Orders:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }
}


module.exports = { makeOrder, getOrder, updateOrder, getAllOrders }