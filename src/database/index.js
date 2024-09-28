import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB;

  if (!connectionUrl) {
    throw new Error("MONGODB environment variable is not set");
  }

  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection is successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error(error.message);
  }
};

export default connectToDB;
