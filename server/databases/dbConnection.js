import mongoose from "mongoose";

export function dbConnection() {
  return mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("database connected"))
    .catch((err) => console.log("error connection", err));
}
