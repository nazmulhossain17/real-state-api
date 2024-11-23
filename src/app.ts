import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import RealStateRoute from "./app/modules/realState/realState.routes";
import UserRoute from "./app/modules/user/user.routes";

dotenv.config();

const app: Express = express();

// Middleware setup
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RealState Routes
app.use("/api/real-state", RealStateRoute);
// Seller Routes
app.use("/api/user", UserRoute);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Not Found route (404 error) ****
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found"
      }
    ]
  });
});

export default app;
