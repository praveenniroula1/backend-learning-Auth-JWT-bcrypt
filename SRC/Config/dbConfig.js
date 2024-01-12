import mongoose from "mongoose";

const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log("NO DATABASE CONNECTION");
    }
    const connection = mongoose.connect(conStr);
    connection && console.log("mongoDb COnnected");
  } catch (error) {
    console.log(error);
  }
};
export default dbConnection;
