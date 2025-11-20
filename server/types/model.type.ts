import mongoose, { Document } from "mongoose";

//user model type
export interface IUser extends Document {
  email: string;
  password: string;
}

//categories model type

export interface ICategory extends Document {
  name: string;
  color: string;
  userId: mongoose.Schema.Types.ObjectId;
}

//budgets model type

export interface IBudget extends Document {
  month: Date;
  limit: number;
  userId: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
}

//expense model type

export interface IExpense extends Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  date: Date;
}
