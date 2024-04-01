import mongoose, { Document, Schema } from 'mongoose';

// Define interface for the State document
interface IState extends Document {
    name: string;
}

// Define schema for the State document
const StateSchema = new Schema<IState>({
    name: { type: String, required: true }
});

// Create and export the model
const StateModel = mongoose.models.StateModel || mongoose.model<IState>('State', StateSchema);
export default StateModel;
