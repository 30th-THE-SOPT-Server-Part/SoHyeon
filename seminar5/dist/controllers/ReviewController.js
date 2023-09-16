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
const services_1 = require("../services");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const { validationResult } = require('express-validator');
/**
 * @route POST /review/movies/:movieId
 * @desc Create Review
 * @access Public
 */
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    const reviewCreateDto = req.body;
    const { movieId } = req.params;
    try {
        const data = yield services_1.ReviewService.createReview(movieId, reviewCreateDto);
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_REVIEW_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route GET /review/movies/:movieId
 * @desc Get Review
 * @access Public
 */
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const data = yield services_1.ReviewService.getReviews(movieId);
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_REVIEW_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createReview,
    getReviews
};
//# sourceMappingURL=ReviewController.js.map