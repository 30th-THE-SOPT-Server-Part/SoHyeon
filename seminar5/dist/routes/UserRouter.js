"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const check_1 = require("express-validator/check");
const router = (0, express_1.Router)();
// route => use (/user) => post (/)
router.post('/', [
    (0, check_1.body)('password').isLength({ min: 6 }),
    (0, check_1.body)('password').notEmpty(),
    (0, check_1.body)('name').notEmpty(),
    (0, check_1.body)('phone').notEmpty(),
    (0, check_1.body)('email').isEmail()
], controllers_1.UserController.createUser);
router.put('/:userId', controllers_1.UserController.updateUser);
router.get('/:userId', controllers_1.UserController.findUserById);
router.delete('/:userId', controllers_1.UserController.deleteUser);
router.post('/signin', [
    (0, check_1.body)('email').notEmpty(),
    (0, check_1.body)('email').isEmail(),
    (0, check_1.body)('password').isLength({ min: 6 }),
    (0, check_1.body)('password').notEmpty()
], controllers_1.UserController.signInUser);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map