import mongoose from "mongoose";
import { PostType} from "interfaces/PostType";

// Define a schema
const Schema = mongoose.Schema;

const PostModelSchema = new Schema<PostType>(
    {
        post_description: {
            type: String,
            required: true,
        },
        time_posted: {
            type: String,
            required: true,
        },
        photos: [{
            type:String,
            required: [true, "Photos are required"]
        }],
        creator: {
            id: { type: String },
            name: { type: String },
            profilePicture: { type: String }
        },
    },
    { timestamps: true }
);

export default mongoose.model('Post', PostModelSchema);