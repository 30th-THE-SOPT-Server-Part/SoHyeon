"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogController_1 = __importDefault(require("../controllers/BlogController"));
const router = (0, express_1.Router)();
// /blog
router.post('/', BlogController_1.default.createBlog);
router.put('/:blogId', BlogController_1.default.updateBlog);
router.get('/:blogId', BlogController_1.default.findBlogById);
router.delete('/:blogId', BlogController_1.default.deleteBlog);
exports.default = router;
//# sourceMappingURL=BlogRouter.js.map