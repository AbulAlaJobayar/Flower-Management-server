import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

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
        required: [true, 'please input strong password'],
        select:0
    },
    parchesHistory:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_slat_round))
    next()
})
export const User = model<TUser>('User', userSchema);