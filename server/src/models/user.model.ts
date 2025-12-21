import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, unique: true, lowercase: true, trim: true },
        name: String,
        password: String,
        role: String
    },
    { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
