import express, { Request, response, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { UserService } from "../services";
import { UserUpdateDto } from "../interfaces/user/userUpdateDto";
import { body, validationResult } from "express-validator";
import getToken from "../modules/jwtHandler";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
    // 유효성 검사
    const error = validationResult(req);
    if (!error.isEmpty()){
        console.log(error)
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }


    const userCreateDto: UserCreateDto = req.body; // User Create Dto로 req.body 받아옴.
    
    try {
        const result = await UserService.createUser(userCreateDto);
        if(!result) return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, message.PASSWWORD_DUPLICATED));

        // 아까 만든 jwtHandler.ts 내 getToken을 통해 access token (JWT) 받아와 전달
        const accesssToken = getToken(result._id);

        const data = {
            _id: result._id,
            accesssToken
        };
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        await UserService.updateUser(userId, userUpdateDto);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_USER_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
* @route GET /user/:userId
 * @desc Update User
 * @access Public
 */
const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await UserService.deleteUser(userId);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NOT_FOUND, message.DELETE_USER_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route POST /user/signin
 * @desc signin User
 * @access Public
 */
const signInUser = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const userSignInDto: UserSignInDto = req.body;

    try {
        const result = await UserService.signInUser(userSignInDto);

        // 로그인 후 accessToken 반환
        if(!result) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        else if (result == 401) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD));

        const accessToken = getToken((result as PostBaseResponseDto)._id);

        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data));
    } catch (e) {
        console.log(e)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
}