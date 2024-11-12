import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";

const port = process.env.PORT || 5000;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbURL as string);
    console.log("Database Connected!");

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", (error as Error).message);
  }
};

connectDB();
