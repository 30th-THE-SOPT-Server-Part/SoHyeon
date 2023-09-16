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
const express_validator_1 = require("express-validator");
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const services_1 = require("../services");
/**
 * @route POST /movie
 * @desc Create Movie
 */
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 유효성 검사
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    // POST 파라미터
    const moviecreateDto = req.body;
    //const startDate: Date = new Date();
    try {
        const data = yield services_1.MovieService.createMovie(moviecreateDto);
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_MOVIE_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route GET /movie/:movieId
 * @desc Get Movie
 */
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const data = yield services_1.MovieService.getMovie(movieId);
        if (!data) {
            res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        }
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_MOVIE_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route PUT /movie/:movieId
 * @desc Update Movie
 */
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieUpdateDto = req.body;
    const { movieId } = req.params;
    try {
        yield services_1.MovieService.updateMovie(movieId, movieUpdateDto);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NO_CONTENT, responseMessage_1.default.UPDATE_MOVIE_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        yield services_1.MovieService.deleteMovie(movieId);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NO_CONTENT, responseMessage_1.default.DELETE_MOVIE_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route POST /movie/:movieId/comment
 * @desc Create Movie Comment
 */
const createMovieComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    }
    const movieCommentCreateDto = req.body;
    const { movieId } = req.params;
    try {
        const data = yield services_1.MovieService.createMovieComment(movieId, movieCommentCreateDto);
        if (!data) {
            res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        }
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_MOVIE_COMMENT_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route PUT /movie/:movieId/comments/:commentId
 * @desc Update Movie Comment
 * @access Private : auth 추가
 */
const updateMovieComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.BAD_REQUEST));
    }
    const movieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;
    const userId = req.body.user.id;
    try {
        const data = yield services_1.MovieService.updateMovieComment(movieId, commentId, userId, movieCommentUpdateDto);
        if (!data)
            return res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.UPDATE_MOVIE_COMMENT_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment
};
//# sourceMappingURL=MovieController.js.map