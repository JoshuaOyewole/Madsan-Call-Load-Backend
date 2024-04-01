import mongoose from "mongoose";
import { OTPType } from "interfaces/OTPType";

// Define a schema
const Schema = mongoose.Schema;

const OTPModelSchema = new Schema<OTPType>(
    {
        email: {
            type: String,
            unique: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: Date,
    },
    { timestamps: true }
);

export default mongoose.model('OTP', OTPModelSchema);