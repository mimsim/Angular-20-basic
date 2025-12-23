import * as bcrypt from 'bcryptjs';
import { Schema, model, Document } from 'mongoose';


export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, unique: true, lowercase: true, trim: true },
        name: String,
        password: { type: String, select: false },
        role: String
    },
    { timestamps: true }
);



UserSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const obj = ret as any;

        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        delete obj.password;

        return obj;
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


export const User = model<IUser>('User', UserSchema);