import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'please input your name']
    },
    email: {
        type: String,
        required: [true, 'please input your valid Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please input strong password']
    }

}, { timestamps: true })
export const User = model<TUser>('User', userSchema);