import mongoose, { Error } from "mongoose";

const dbConnection = async () => {
  const { MONGODB_CNN, MONGODB_TEST_CNN, NODE_ENV } = process.env;
  const connectionString = NODE_ENV === "test" ? MONGODB_TEST_CNN : MONGODB_CNN;

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error in connection to mongoDB ", error);
    });
};

export default dbConnection;
