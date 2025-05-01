import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongodbConnection = await connect(process.env.CONNECTION_STRING);
    console.log(`Db connected : ${mongodbConnection.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
