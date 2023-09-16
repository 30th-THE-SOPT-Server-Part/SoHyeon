import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MoviesResponseDto } from "../interfaces/movie/MoviesResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import Movie from "../models/Movie";

const createMovie = async (moviecreateDto: MovieCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie(moviecreateDto);

        await movie.save();

        const data = {
            _id: movie._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMovie = async (movieId : string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate('comments.writer');

        if (!movie) return null;

        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {
    try {
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteMovie =async (movieId:string) => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createMovieComment = async (movieId: string, movieCommentCreateDto: MovieCommentCreateDto) : Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const newComents: MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto];

        const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, {comments: newComents}, {new: true});

        return updatedMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovieComment = async (movieId: string, commentId: string, userId: string, movieCommentUpdateDto: MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {_id: movieId, comments: { $elemMatch: { _id: commentId, writer: userId } } },
            {
                $set: {
                    'comments.$.writer': userId,
                    'comments.$.comment': movieCommentUpdateDto.comment
                }
            },
            { new: true }
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMovieBySearch = async (search: string, option: MovieOptionType, page: number): Promise<MoviesResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let movies: MovieInfo[] = [];
    const perPage: number = 2;

    try {
        const titleRegex: RegExp = regex(search);

        if (option === 'title') {
            movies = await Movie.find({ title: { $regex: titleRegex } })
                .sort({ createAt: -1 }) // 최신순 정렬
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else if (option === 'director') {
            movies = await Movie.find({ director: { $regex: titleRegex } })
                .sort({ createAt: -1 }) // 최신순 정렬
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else {
            movies = await Movie.find({
                $or: [
                    { title: { $regex: titleRegex } },
                    { director: { $regex: titleRegex } }
                ]
            })
            .sort({ createAt: -1 }) // 최신순 정렬
            .skip(perPage * (page - 1))
            .limit(perPage);
        }

        const total: number = await Movie.countDocuments({}); // 모든 document 개수
        const lastPage: number = Math.ceil(total / perPage);

        const data = {
            movies,
            lastPage
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
    getMovieBySearch
}