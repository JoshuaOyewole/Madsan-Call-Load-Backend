import StateModel from "../../models/states";
import { Request, Response, NextFunction } from 'express';
import createError from "../../util/error";
import { StatusCodes } from "http-status-codes";


async function checkExistingState(state: string) {
    try {
        // Check if email exists
        const existingState = await StateModel.findOne({ name: state }).exec();
        if (existingState) {
            return { exists: true, field: 'state' };
        }

        return { exists: false };
    } catch (error) {
        console.error('Error checking existing state:', error);
        throw error;
    }
}

/* GET ALL STATES */
export async function getAllStates(req: Request, res: Response, next: NextFunction) {
    try {
        const states = await StateModel.find({});
        return res.status(StatusCodes.OK).json({ data: states });
    } catch (error: any) {
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }
}
export async function getState(req: Request, res: Response, next: NextFunction) {
    const name = req.query.name;

    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({ data: { message: "Kindly enter a valid State Name" } })
    }
    try {
        const state = await StateModel.findOne({name:name});
        // If state is not found, return 404 Not Found
        if (!state) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'State not found' });
        }
        // If company is found, return it
        return res.status(StatusCodes.OK).json({ data: state })
    }
    catch (err) {
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${err.message})}`))
    }
}

/* ADD A STATE */
export async function addState(req: Request, res: Response, next: NextFunction) {

    let { name } = req.body;

    try {

        // If incomplete data is sent, return 400 Not Found
        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: {
                    message: 'State name is missing!'
                }
            });
        }
        else {
            const stateExist = await checkExistingState(name);

            if (stateExist.exists) {
                return res.status(StatusCodes.CONFLICT).json({ data: { message: `State already Exist!` } })
            }
            else {
                await StateModel.create({ name });

                return res.status(StatusCodes.OK).json({ data: { message: `State created Successfully!` } })
            }
        }
    }
    catch (error: any) {
        // Handle server errors
        console.error('Error creating state:', error);
        next(createError(500, `${error.message}`));
    }


}


export async function multipleState(req: Request, res: Response) {
    try {
        // Insert the array of state objects into the database
        const result = await StateModel.insertMany(req.body);
        res.status(200).json({ message: 'States added successfully:' });
        return result;
    } catch (error) {
        console.error('Error adding states:', error);
        throw error; // Rethrow the error for handling in the caller
    }
}