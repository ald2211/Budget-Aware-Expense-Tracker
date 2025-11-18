import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/model.type";


const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: {type:String, required: true, unique: true}
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
