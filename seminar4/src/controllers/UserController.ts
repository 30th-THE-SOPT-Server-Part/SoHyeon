import express, { Request, response, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { UserService } from "../services";
import { UserUpdateDto } from "../interfaces/user/userUpdateDto";
import { body, validationResult } from "express-validator";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
    // 유효성 검사
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }


    const userCreateDto: UserCreateDto = req.body; // User Create Dto로 req.body 받아옴.
    
    try {
        const data = await UserService.createUser(userCreateDto);
        
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


export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}