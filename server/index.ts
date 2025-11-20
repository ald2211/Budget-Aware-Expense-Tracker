import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection";
import categoriesRoute from "./routes/categories.route";
import budgetsRoute from "./routes/budgets.route";
import expensesRoute from "./routes/expenses.route";
import reportRoute from "./routes/reports.route";
import authRoute from "./routes/auth.route";

config({ path: path.resolve(__dirname, "../.env") });
const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
connectDB();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/budgets", budgetsRoute);
app.use("/api/v1/expenses", expensesRoute);
app.use("/api/v1/reports", reportRoute);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontEnd", "dist")));
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    // Pass to API 404 if it's an API route
    return next();
  }
  res.sendFile(path.join(_dirname, "frontEnd", "dist", "index.html"));
});

// Catch-all route for undefined routes
app.use("/api", (req: Request, res: Response) => {
  res.status(404).sendFile(path.join(_dirname, "frontEnd", "dist", "404.html"));
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, (err?: Error) => {
  if (err) {
    console.log("Failed to start server", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
