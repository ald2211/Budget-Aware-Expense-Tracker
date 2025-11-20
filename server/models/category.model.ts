import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/model.type";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Categories", CategorySchema);
