// src/middleware/roles.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

// Разширяваме Request за TypeScript
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

export const roleMiddleware = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }

            next();
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    };
};
