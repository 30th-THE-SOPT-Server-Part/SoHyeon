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
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const util_1 = __importDefault(require("../modules/util"));
const services_1 = require("../services");
/**
 * @route POST /blog
 * @desc Create Blog
 * @access Public
 */
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogCreateDto = req.body;
    try {
        const data = yield services_1.BlogService.createBlog(blogCreateDto);
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_BLOG_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route GET /blog/:blogUd
 * @desc Update Blog
 * @access Public
 */
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogUpdateDto = req.body;
    const { blogId } = req.params;
    try {
        yield services_1.BlogService.updateBlog(blogId, blogUpdateDto);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NO_CONTENT, responseMessage_1.default.UPDATE_BLOG_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const findBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const data = yield services_1.BlogService.findBlogById(blogId);
        if (!data) {
            return res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        }
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_BLOG_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.success(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        yield services_1.BlogService.deleteBlog(blogId);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NOT_FOUND, responseMessage_1.default.DELETE_BLOG_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
};
//# sourceMappingURL=BlogController.js.map