import mongoose, { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
    title: string | null;
    description: string | null;
    completed: boolean;
    picker?: string | null;
    userId: string;
}

const TaskSchema = new Schema(
    {
        title: { type: String, required: false, default: null },
        description: { type: String, default: null },
        picker: { type: String, default: null }, // ← добавено
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
