import mongoose, { Schema, Document } from 'mongoose';

// Define a schema for the branch locations
interface IBranchLocation {
    state: string;
    address: string;
}

// Define a schema for the company
interface ICompany extends Document {
    companyName: string;
    companyAddress: string;
    email: string,
    phoneNumber: string,
    password: string,
    category: string,
    accountNumber: string,
    accountName: string,
    bankName: string,
    price: string,
    states: string[],
    branches: IBranchLocation[];
}


const companySchema: Schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 200
    },
    states: {
        type: [String],
    },
    phoneNumber: {
        type: String,
        unique: true,
        maxLength: 200
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['buyer', 'seller']
    },
    price: { type: Number },
    accountNumber: { type: String },
    accountName: { type: String },
    bankName: { type: String },
    branches: [{
        state: { type: String },
        address: { type: String }
    }]
})

const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', companySchema);
module.exports = Company;