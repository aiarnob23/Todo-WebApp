import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>({
    userId: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    name: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: false,
        trim:true,
    },
})

export const User = model<TUser>('User', userSchema);