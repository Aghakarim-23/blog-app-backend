import mongoose from "mongoose";

export const getConnectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB is connected ✅`);
  } catch (error) {
    console.error(`MONGO DB is connected ❌, ${error}`);
    process.exit(1);
  }
};
