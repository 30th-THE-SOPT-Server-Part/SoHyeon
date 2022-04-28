import express, { Request, Response } from 'express';
import { BlogCreateDto } from '../interfaces/blog/BlogCreateDto';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { BlogService } from '../services';

/**
 * @route POST /blog
 * @desc Create Blog
 * @access Public
 */
const createBlog = async (req: Request, res: Response) => {
    const blogCreateDto: BlogCreateDto = req.body;

    try {
        const data = await BlogService.createBlog(blogCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);

        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createBlog
}