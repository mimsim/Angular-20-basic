import { Request, Response } from 'express';
import { User } from '../models/user.model';
import mongoose from 'mongoose';
import { Task } from '../models/task.model';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, name, password: hashed });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // ТУК Е ПРОМЯНАТА ↓↓↓
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return res.status(200).json({ token });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};


export const getUsers = async (_: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Проверка дали id е валиден ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user id" });
        }

        // Взимаме user-а без паролата
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Взимаме всички tasks за този user
        const tasks = await Task.find({ userId: id });

        return res.status(200).json({
            user,
            tasks,
        });
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'Invalid user' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user id' });
        }

        // ❗ никога не позволявай директен update на password така
        const { password, ...updateData } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,        // връща обновения user
                runValidators: true
            }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: (err as Error).message });
    }
};

