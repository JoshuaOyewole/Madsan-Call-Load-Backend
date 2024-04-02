import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const createError = require("../../util/error");
import OrderModel from "models/orders";
import InvoiceModel from "models/invoice";
import Company from "models/company";

export async function createInvoice(req: Request, res: Response, next: NextFunction) {

    const { orderId } = req.body;

    try {

        const order = await OrderModel.findById(orderId).exec();

        if (order.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ data: { message: "Order doesn't Exist!" } });
        }
        //Extract datas from the Orders
        let { buyerCompanyName, email, sellerCompanyState, sellerCompanyName, pickupStateAddress, buyerDestination, quantity, totalCost, productAmount, productName, buyerPhoneNumber, sellerCompanyId, buyerCompanyId } = order;

        /* Get the seller company Acc No, Acc Name and Bank Name*/
        const companyBankDetails = await Company.findOne({ _id: orderId }).select('accountNumber accountName bankName');

        const newInvoice = await InvoiceModel.create({ buyerCompanyName, email, sellerCompanyState, sellerCompanyName, pickupStateAddress, buyerDestination, quantity, totalCost, productAmount, productName, buyerPhoneNumber, sellerCompanyId, buyerCompanyId, ...companyBankDetails });


        return res.status(StatusCodes.OK).json({ data: { id: newInvoice._id, message: `Invoice generated Successfully!` } })
    }
    catch (error: any) {
        // Handle server errors
        console.error('Error creating Invoice:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))

    }
}