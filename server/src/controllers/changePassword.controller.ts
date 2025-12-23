import * as bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { User } from '../models/user.model';

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(id).select('+password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
       
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: 'Old password is incorrect' });
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
    }
};
