import { Document } from "mongoose";

//user model type
export interface IUser extends Document {
    email:string,
    password:string,
}
