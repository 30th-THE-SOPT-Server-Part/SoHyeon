"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/user', require('./user')); // => user.ts
router.use('/blog', require('./blog')); // => blog.ts
router.use('/like', require('./like')); // => like.ts
router.use('/signup', require('./signup')); // => signup.ts
module.exports = router;
//# sourceMappingURL=index.js.map