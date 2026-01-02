import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        name: { type: String },
        role: { type: String, default: 'user' },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        const { _id, __v, password, ...rest } = ret;
        return {
            id: _id.toString(),
            ...rest
        };
    },
});
export const User = model<IUser>('User', UserSchema);
