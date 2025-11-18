import { errorHandler } from "./../utils/customError";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { authValidationSchema } from "../utils/validator";

// Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //joi validation
    const { error } = authValidationSchema.validate(
      {
        email,
        password,
      },
      { abortEarly: true }
    );

    if (error) {
      next(errorHandler(400, error.details[0].message));
      return;
    }
    let user = await User.findOne({ email });
    if (user) {
      next(errorHandler(400, "Email already registered"));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.log("error at token creation:", err);
          next(errorHandler(500, "Sign in Failed please try again"));
          return;
        }
        const { password, ...rest } = user.toObject();
        res
          .status(200)
          .json({ success: true, message: "welcome", userData: rest, token });
      }
    );
  } catch (error: any) {
    console.log("signup error", error.message);
    next(error);
  }
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //joi validation
    const { error } = authValidationSchema.validate(
      {
        email,
        password,
      },
      { abortEarly: true }
    );

    if (error) {
      next(errorHandler(400, error.details[0].message));
      return;
    }
    let user = await User.findOne({ email });
    if (!user) return next(errorHandler(400, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler(400, "Invalid credentials"));

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.log("login err:", err);
          return next(errorHandler(400, "login failed"));
        }
        const { password, ...rest } = user.toObject();
        res
          .status(200)
          .json({ success: true, message: "welcome", userData: rest, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
