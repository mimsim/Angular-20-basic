import mongoose, { Schema, model  } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    userId: string;
    completed: boolean;
}

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
export const Task = model("Task", TaskSchema);