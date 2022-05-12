import { Router } from "express";
import {UserController } from "../controllers";
import User from "../models/User";
import { body } from "express-validator/check"

const router: Router = Router();

// route => use (/user) => post (/)
router.post('/', [
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('email','잘못된 이메일 형식이에요!').isEmail(),
    body('age').notEmpty(),
    body('school').notEmpty()
],UserController.createUser);


router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;