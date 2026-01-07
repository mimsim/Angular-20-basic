import { Request, Response } from 'express';
import { Task } from '../models/task.model';

export const getTasksByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const task = await Task.create({
            title,
            description,
            userId, // използваме userId за когото е task
        });

        res.status(201).json(task);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Проверка за валидно ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        // Взимаме таска по _id и userId (който е селектираният user)
        // Например ако client-а праща userId като query или body
        const task = await Task.findById(id); // просто по ID

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(task);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTaskById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, userId });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTaskById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { id } = req.params;

        const updated = await Task.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ message: "Task not found" });

        res.status(200).json(updated);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};