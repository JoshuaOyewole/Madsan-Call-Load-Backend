import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Company from "../../models/company";
import createError from "../../util/error";
import bcrypt from "bcrypt"
import StateModel from "../../models/states";

// Function to check if email or phone number already exists
async function checkExistingEmailAndPhone(email: string, phoneNumber: string) {
    try {
        // Check if email exists
        const existingEmail = await Company.findOne({ email: email }).exec();
        if (existingEmail) {
            return { exists: true, field: 'email' };
        }

        // Check if phone number exists
        const existingPhoneNumber = await Company.findOne({ phoneNumber: phoneNumber });
        if (existingPhoneNumber) {
            return { exists: true, field: 'phoneNumber' };
        }

        // Neither email nor phone number exists
        return { exists: false };
    } catch (error) {
        console.error('Error checking existing email and phone number:', error);
        throw error;
    }
}

/* GET ALL COMPANIES BASED ON A STATE*/
export async function companiesByState(req: Request, res: Response, next: NextFunction) {
    const { state } = req.query;

    try {
        const companies = await Company.find({ states: state }).select('companyName');

        // If company is not found for that state, return 404 Not Found
        if (companies.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ data: companies, message: 'No Company was found' });
        }
        // If company is found, return the company name, and id 
        return res.status(StatusCodes.OK).json({ data: companies })
    }

    catch (error: any) {
        // Handle server errors
        console.error('Error fetching company:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }

}
export async function companyBranches(req: Request, res: Response, next: NextFunction) {
    const { companyId, state } = req.query;

    try {
        const isCompanyIdValid = await Company.findById(companyId).select('-password');
        const isStateNameValid = await StateModel.findOne({ name: state });

        // If company is not found for that state, return 404 Not Found
        if (isCompanyIdValid?.length === 0 || isStateNameValid?.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid Datas supplied' });
        }
        // If company is found, 
        // Find branches of the company in the specified state
        const branchesInState = isCompanyIdValid.branches.filter((branch: { state: string | null; }) => branch.state === state);
        return res.status(StatusCodes.OK).json({ data: branchesInState })
    } catch (error) {
        console.error('Error fetching Company branches:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }
}
export async function addCompany(req: Request, res: Response, next: NextFunction) {

    const { companyName, companyAddress, email, phoneNumber, password, category, accountNumber, accountName, bankName, states, branches } = req.body;

    try {
        // If incomplete data is sent, return 400 Not Found
        if (!companyName || !email || !phoneNumber || !password || !category) {
            return res.status(StatusCodes.BAD_REQUEST).json({ data: { message: 'Some required fields are missing!' } });
        }
        else {
            const phoneNumberEmailExist = await checkExistingEmailAndPhone(email, phoneNumber);


            if (phoneNumberEmailExist.exists) {
                return res.status(StatusCodes.CONFLICT).json({ data: { message: `Email address or Phone Number already Exist!` } })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const newCompany = {
                    companyName, companyAddress, email, phoneNumber, category, accountNumber, accountName, bankName, states, branches, password: hash,
                };
                await Company.create(newCompany);
                return res.status(StatusCodes.OK).json({ data: { message: `Registration Successful!` } })
            }
        }

    } catch (error: any) {
        // Handle server errors
        console.error('Error adding company:', error);
        //throw new Error(error);
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))

    }
}

export async function getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
        const companies = await Company.find().select('-password');

        // If company is not found, return 404 Not Found
        if (companies.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Company was found' });
        }
        // If company is found, return it
        return res.status(StatusCodes.OK).json({ data: companies })
    } catch (error) {
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${error.message})}`))
    }
}

export async function getCompany(req: Request, res: Response, next: NextFunction) {

    const id = req.params.id;

    console.log(id);

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ data: { message: "Kindly enter a valid Company ID" } })
    }
    try {
        const companies = await Company.findById(id).select('-password');
        // If company is not found, return 404 Not Found
        if (!companies) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Company was found' });
        }
        // If company is found, return it
        return res.status(StatusCodes.OK).json({ data: companies })
    }
    catch (err) {
        next(createError(StatusCodes.INTERNAL_SERVER_ERROR, `${err.message})}`))
    }
}