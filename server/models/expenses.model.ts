import mongoose, { Schema } from "mongoose";
import { IExpense } from "../types/model.type";

const ExpenseSchema = new Schema<IExpense>(
  {
    date: { type: Date, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expenses", ExpenseSchema);
