import { mailOptionsType, verifyOTPCredentialsType } from "interfaces/OTPType";
import OTP from "../models/OTP"
import createError from "../util/error"
import sendEmail from "../util/sendEmail";
import { verifyHashedData, hashData } from "./hashData";



const { AUTH_EMAIL } = process.env;

const generateOTP = () => Math.floor(1000 + Math.random() * +9000);

const deleteOTP = async (email: string) => {
    try {
        //clear any old Record
        await OTP.deleteOne({ email });
    } catch (error) {
        throw error;
    }
}
const sendOTP = async (otpDetails: mailOptionsType) => {
    const { email, subject, message, duration } = otpDetails;

    if (!(email && subject && message)) {
        return createError(402, "Kindly provide values for Email, Subject, Message")
    }
    try {

        //clear any old Record
        await deleteOTP(email);

        //Generate OTP PIN
        // const generatedOTP = Math.floor(1000 + Math.random() * +9000);
        const generatedOTP = generateOTP();


        //Send Email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p> ${message} </p><p style="color:tomato; font-size:25px; letter-sapcing:2px;"><b>${generatedOTP}</b></p><p> This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }
        await sendEmail(mailOptions)

        //save OTP Record
        const hashOTP = hashData(generatedOTP.toString())
        /*  const salt = bcrypt.genSaltSync(10);
         const hashOTP = bcrypt.hashSync(generatedOTP.toString(), salt); */

        const newOTP = {
            email,
            otp: hashOTP,
            expiresAt: Date.now() + 3600000 * + duration
        }

        const createdOTPRecord = await OTP.create(newOTP);
        return createdOTPRecord;

    } catch (error) {
        throw error
    }
}

const verifyOTP = async (OTPCredentials: verifyOTPCredentialsType) => {
    const { email, otp } = OTPCredentials;

    try {
        if (!email && otp) {
            throw Error("Kindly provide Email or OTP Values")
        }

        const matchedOTPRecord = await OTP.findOne({ email });

        if (!matchedOTPRecord) {
            throw Error("No OTP Records Found")
        }

        const { expiresAt } = matchedOTPRecord;

        //Checking for Expired OTP Code
        //const currentTime = new Date();

        if (expiresAt < (new Date())) {
            await OTP.deleteOne({ email });

            throw Error("OTP Code has expired. Kindly request for a new One.")
        }

        //Not yet Expire
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = verifyHashedData(otp, hashedOTP);

        return validOTP;

    } catch (error) {
        throw error
    }

}


export { sendOTP, generateOTP, verifyOTP, deleteOTP }