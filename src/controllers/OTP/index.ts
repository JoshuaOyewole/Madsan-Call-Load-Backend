import { Request, Response, NextFunction } from 'express';
import { sendOTP } from "../../util/OTP";


//Post Creation Controller
const sendOTPController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, subject, message, duration } = req.body;

    try {
        await sendOTP({
            email,
            subject,
            message,
            duration
        });
        res.status(200).json("OTP has been successfully sent to your Email")
    } catch (error) {
        res.status(400).send(error.message)
    }

}

export { sendOTPController };