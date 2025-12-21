import { Router } from 'express';
import { createUser, getUserById, getUsers } from './controllers/user.controller';


const router = Router();

router.get('/users', getUsers);
router.post('/user', createUser);
router.get('/user/:id', getUserById)
export default router;
