import { Request, Response } from 'express';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

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
            return res.status(400).json({ error: 'Invalid user id' });
        }

        const user = await User.findById(id).select('-password'); // exclude password
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
    }
};
