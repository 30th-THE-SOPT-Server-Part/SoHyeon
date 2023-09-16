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
const express_validator_1 = require("express-validator");
const jwtHandler_1 = __importDefault(require("../modules/jwtHandler"));
/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 유효성 검사
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.BAD_REQUEST));
    }
    const userCreateDto = req.body; // User Create Dto로 req.body 받아옴.
    try {
        const result = yield services_1.UserService.createUser(userCreateDto);
        if (!result)
            return res.status(statusCode_1.default.CONFLICT).send(util_1.default.fail(statusCode_1.default.CONFLICT, responseMessage_1.default.PASSWWORD_DUPLICATED));
        // 아까 만든 jwtHandler.ts 내 getToken을 통해 access token (JWT) 받아와 전달
        const accesssToken = (0, jwtHandler_1.default)(result._id);
        const data = {
            _id: result._id,
            accesssToken
        };
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_USER_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdateDto = req.body;
    const { userId } = req.params;
    try {
        yield services_1.UserService.updateUser(userId, userUpdateDto);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NO_CONTENT, responseMessage_1.default.UPDATE_USER_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
* @route GET /user/:userId
 * @desc Update User
 * @access Public
 */
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const data = yield services_1.UserService.findUserById(userId);
        if (!data) {
            return res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        }
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.READ_USER_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield services_1.UserService.deleteUser(userId);
        res.status(statusCode_1.default.NO_CONTENT).send(util_1.default.success(statusCode_1.default.NOT_FOUND, responseMessage_1.default.DELETE_USER_SUCCESS));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route POST /user/signin
 * @desc signin User
 * @access Public
 */
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.BAD_REQUEST));
    }
    const userSignInDto = req.body;
    try {
        const result = yield services_1.UserService.signInUser(userSignInDto);
        // 로그인 후 accessToken 반환
        if (!result)
            return res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        else if (result == 401)
            return res.status(statusCode_1.default.UNAUTHORIZED).send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.INVALID_PASSWORD));
        const accessToken = (0, jwtHandler_1.default)(result._id);
        const data = {
            _id: result._id,
            accessToken
        };
        res.status(statusCode_1.default.OK).send(util_1.default.success(statusCode_1.default.OK, responseMessage_1.default.SIGNIN_USER_SUCCESS, data));
    }
    catch (e) {
        console.log(e);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
};
//# sourceMappingURL=UserController.js.map