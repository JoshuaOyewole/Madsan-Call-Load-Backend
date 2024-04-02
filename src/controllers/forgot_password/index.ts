
import { Request, Response, NextFunction } from 'express';
const createError = require("../../util/error");
import { sendOTP, verifyOTP, deleteOTP } from "../../util/OTP";
import { hashData } from "../../util/hashData";
const Company = require("../../models/company");


const forgetPWD = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email } = req.body;

        //trim off whiteSpace
        email = email.trim();

        if (!email) next(createError(400, "Email Address is required"))

        const existingUser = await Company.findOne({ email });


        if (existingUser.length === 0) next(createError(400, 'Email Address provided does not Exist!'));

        const otpDetails = {
            email,
            subject: 'Password Reset',
            message: "Enter the Code below to reset your Password",
            duration: 1
        }

        await sendOTP(otpDetails);

        res.status(200).json({
            data: { email: email },
            status: 200,
            message: `OTP has been successfully sent to your Email!`,
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

const resetPWD = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp, newPassword } = req.body;

        /* VALIDATIONs */
        if (!(email && otp && newPassword)) {
            return res.status(400).json({ error: 'Empty Credentials are not allowed!' })
        }

        const validOTP = await verifyOTP({ email, otp });

        if (!validOTP) {
            return res.status(400).json("Incorrect OTP Entered!. Try Again")
        }

        if (newPassword.length < 6) {
            return res.status(400).json("Password is too Short!")
        }

        const hashedNewPassword = hashData(newPassword);

        //Update User Record
        await Company.updateOne({ email }, { password: hashedNewPassword });

        //clear any old Record
        await deleteOTP(email);

        res.status(200).json({
            success: true,
            status: 200,
            message: `Password Reset Successful!`,
        });
    }
    catch (err) {
        next(createError(400, err.message))
    }
}
module.exports = { forgetPWD, resetPWD }