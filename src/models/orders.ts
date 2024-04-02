import mongoose, { Document, Schema, Types } from 'mongoose';

// Define interface for the order document
interface IOrder extends Document {
    buyerCompanyName: string,
    buyerCompanyId?: Types.ObjectId,
    email: string,
    sellerCompanyState: string,
    sellerCompanyName: string,
    pickupStateAddress: string,
    buyerDestination: string,
    quantity: number,
    totalCost: number,
    productAmount: number,
    productName?: string,
    buyerPhoneNumber?: string,
    sellerCompanyId: Types.ObjectId;
}

// Define schema for the order document
const OrderSchema = new Schema<IOrder>({
    buyerCompanyName: { type: String, required: true },
    buyerCompanyId: { type: Schema.Types.ObjectId, ref: 'Company'},
    email: { type: String, required: true },
    sellerCompanyState: { type: String, required: true },
    sellerCompanyName: { type: String, required: true },
    pickupStateAddress: { type: String, required: true },
    buyerDestination: { type: String, required: true },
    quantity: { type: Number, required: true },
    productAmount: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    productName: { type: String, },
    buyerPhoneNumber: { type: String},
    sellerCompanyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true } // Reference to the Company model
});

// Create and export the model
const OrderModel = mongoose.models.OrderModel || mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
