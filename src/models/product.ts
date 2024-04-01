import mongoose, { Document, Schema } from 'mongoose';

// Define interface for the product document
interface IProduct extends Document {
    productName: string;
    productAmount: number;
    company: Schema.Types.ObjectId;
}

// Define schema for the product document
const ProductSchema = new Schema<IProduct>({
    productName: { type: String, required: true },
    productAmount: { type: Number, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true } // Reference to the Company model
});

// Create and export the model
const ProductModel = mongoose.models.ProductModel || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
