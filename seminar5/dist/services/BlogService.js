"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = __importDefault(require("../models/Blog"));
const createBlog = (blogCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = new Blog_1.default({
            title: blogCreateDto.title,
            content: blogCreateDto.content,
            writer: blogCreateDto.writer
        });
        yield blog.save();
        const data = {
            _id: blog.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateBlog = (blogId, blogUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog_1.default.findByIdAndUpdate(blogId, blogUpdateDto);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findBlogById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(blogId);
        if (!blog) {
            return null;
        }
        return blog;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog_1.default.findByIdAndDelete(blogId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
};
//# sourceMappingURL=BlogService.js.map