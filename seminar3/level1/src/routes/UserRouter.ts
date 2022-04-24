import { Router } from "express";
import {UserController } from "../controllers";
import User from "../models/User";

const router: Router = Router();

// route => use (/user) => post (/)
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;