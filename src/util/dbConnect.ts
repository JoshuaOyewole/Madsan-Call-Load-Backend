import mongoose from "mongoose";
/*  const dbConnect = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Eatery mongoDB.");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", (err) => {
    console.log(err);
  });
}; */

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('error', (error: Error) => console.log(error));
  } catch (error) {
    console.log(error);

  }
}

export default dbConnect;