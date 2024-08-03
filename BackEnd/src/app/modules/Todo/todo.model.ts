import { model, Schema } from "mongoose";
import { Ttodo } from "./todo.interface";

const todoSchema = new Schema<Ttodo>({
        user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User is required'],
        //ref:'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim:true,
    },
    description: {
        type: String,
        required: false,
        trim:true,
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        trim:true,
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete'],
        default: 'incomplete',
        required:false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required:false,
    }
})

export const Todo = model<Ttodo>('Todo', todoSchema);