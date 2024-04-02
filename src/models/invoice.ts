import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for the Order document
interface IOrder extends Document {
    buyerCompanyName: string;
    buyerCompanyId: Types.ObjectId;
    email: string;
    sellerCompanyState: string;
    sellerCompanyName: string;
    pickupStateAddress: string;
    buyerDestination: string;
    quantity: number;
    productAmount: number;
    status?: string;
    totalCost: number;
    productName?: string;
    buyerPhoneNumber: string;
    sellerCompanyId: Types.ObjectId;
}

// Interface for the Invoice document
interface IInvoice extends IOrder {
    accountNumber: string;
    accountName: string;
    bankName: string;
}
// Define the schema for the Invoice document
const invoiceSchema: Schema<IInvoice> = new Schema<IInvoice>({
    // Define the fields for the Invoice document
    // Include fields from the IInvoice interface
    buyerCompanyName: { type: String, required: true },
    buyerCompanyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    email: { type: String, required: true },
    sellerCompanyState: { type: String, required: true },
    sellerCompanyName: { type: String, required: true },
    pickupStateAddress: { type: String, required: true },
    buyerDestination: { type: String, required: true },
    quantity: { type: Number, required: true },
    productAmount: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    productName: { type: String },
    buyerPhoneNumber: { type: String, required: true },
    sellerCompanyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    status: {
        type: String,
        default: 'pending',
        enum: ['paid', 'pending']
    },
    // Include additional fields for the Invoice document
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    bankName: { type: String, required: true }
});

// Create the Mongoose model for the Invoice schema
const InvoiceModel = mongoose.models.InvoiceModel || mongoose.model<IOrder>('Invoice', invoiceSchema);
export default InvoiceModel;