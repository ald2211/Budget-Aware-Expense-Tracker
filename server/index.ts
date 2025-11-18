import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config({ path: path.resolve(__dirname, "../.env") });
const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "hi" });
});

const port = process.env.PORT || 5000;
app.listen(port, (err?: Error) => {
  if (err) {
    console.log("Failed to start server", err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
