import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, loginUser, registerUser, updateUser } from './controllers/user.controller';
import { changePassword } from './controllers/changePassword.controller';
import { getTasksByUser, createTask, getTaskById, deleteTaskById, updateTaskById } from './controllers/tasks.controller';
import { auth } from './middleware/auth';
import { roleMiddleware } from './middleware/roles';


const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/users', getUsers);
router.post('/user', createUser);
router.get('/user/:id', getUserById)
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
router.put('/user/:id/password', changePassword);


// tasks

router.get("/tasks", auth, getTasksByUser);
router.post("/task", auth, createTask);
router.get("/task/:id", auth, getTaskById);
router.delete("/task/:id", auth, deleteTaskById);
router.put("/task/:id", auth, updateTaskById);


router.get("/admin-dashboard", auth, roleMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome to admin dashboard" });
});

router.get("/profile", auth, roleMiddleware(["user", "admin"]), (req, res) => {
    res.json({ message: "Profile page" });
});

export default router;
