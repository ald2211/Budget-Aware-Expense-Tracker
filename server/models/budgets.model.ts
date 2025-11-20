import mongoose, { Schema } from "mongoose";
import { IBudget } from "../types/model.type";

const BudgetSchema = new Schema<IBudget>(
  {
    month: { type: Date, required: true },
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
    limit: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budgets", BudgetSchema);
