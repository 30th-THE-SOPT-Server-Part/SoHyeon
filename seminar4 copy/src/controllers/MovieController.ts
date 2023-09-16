import express, {Request, Response} from 'express';
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieUpdateDto } from '../interfaces/movie/MovieUpdateDto';
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { MovieService } from '../services';

/**
 * @route POST /movie
 * @desc Create Movie
 */
const createMovie = async (req: Request, res: Response) => {
    // 유효성 검사
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    // POST 파라미터
    const moviecreateDto: MovieCreateDto = req.body;
    const startDate: Date = new Date();

    try {
        const data = await MovieService.createMovie(startDate, moviecreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }


}

/**
 * @route GET /movie/:movieId
 * @desc Get Movie
 */
const getMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.getMovie(movieId);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS));

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route PUT /movie/:movieId
 * @desc Update Movie
 */
const updateMovie = async (req: Request, res:Response) => {
    const movieUpdateDto: MovieUpdateDto = req.body;
    const { movieId } = req.params;

    try {
        await MovieService.updateMovie(movieId, movieUpdateDto);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_MOVIE_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        await MovieService.deleteMovie(movieId)

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_MOVIE_SUCCESS));

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}