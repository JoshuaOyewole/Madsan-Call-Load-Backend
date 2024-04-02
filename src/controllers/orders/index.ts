import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "../../util/error";
import OrderModel from "../../models/orders";


export async function makeOrder(req: Request, res: Response, next: NextFunction) {

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
export async function getOrder(req: Request, res: Response, next: NextFunction) {

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
export async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(StatusCodes.OK).json({ message: "work in progress in progress for this endpoint" })
    } catch (error) {
        console.error('Error updating Order:', error);
    }
}
export async function getAllOrders(req: Request, res: Response, next: NextFunction) {
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