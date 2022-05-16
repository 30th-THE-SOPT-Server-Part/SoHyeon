import { Router } from "express";
import {UserController } from "../controllers";
import User from "../models/User";
import { body } from "express-validator/check"

const router: Router = Router();

// route => use (/user) => post (/)
router.post('/', [
    body('password').isLength({min:6}),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('email').isEmail()
],UserController.createUser);


router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

router.post('/signin', [
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    body('password').notEmpty()
], UserController.signInUser);

export default router;