"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//router index file
const express_1 = require("express");
const UserRouter_1 = __importDefault(require("./UserRouter"));
const BlogRouter_1 = __importDefault(require("./BlogRouter"));
const ReviewRouter_1 = __importDefault(require("./ReviewRouter"));
const MovieRouter_1 = __importDefault(require("./MovieRouter"));
const router = (0, express_1.Router)();
router.use('/user', UserRouter_1.default);
router.use('/blog', BlogRouter_1.default);
router.use('/review', ReviewRouter_1.default);
router.use('/movie', MovieRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map