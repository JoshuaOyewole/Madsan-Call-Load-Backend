import { mailOptionsType } from "interfaces/OTPType";
import nodemailer from "nodemailer";

const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
    }
})

//Test Transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
})

const sendEmail = async (mailOptions:mailOptionsType) =>{
    
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error
    }
}

export default sendEmail